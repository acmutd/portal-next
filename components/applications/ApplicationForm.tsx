import { useState } from "react";
import QuestionComponent from "./QuestionComponent";
import Button from "components/Button";
import Link from "next/link";

interface ApplicationFormResponse {
    responses: string[];
    divisionChoices: string[];
};

interface ApplicationFormProps {
    questions: string[];
    onSubmit: (formResponse: ApplicationFormResponse) => Promise<void>;
    appName: string;
}

export default function ApplicationForm({ questions, onSubmit, appName }: ApplicationFormProps) {
    const [responses, setResponses] = useState<string[]>(Array<string>(questions.length).fill(""));  
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);  
    const updateResponseAtIndex = (index: number, newResponse: string) => {
        setResponses((prev) => prev.map((res, listIndex) => {
            if (index === listIndex) return newResponse;
            return res;
        }));
    }
    
    const [divisionChoices, setDivisionChoices] = useState<string[]>(Array<string>(3).fill(""));
    const updateDivisionChoiceAtIndex = (index: number, newResponse: string) => {
        setDivisionChoices((prev) => prev.map((res, listIndex) => {
            if (index === listIndex) return newResponse;
            return res;
        }));
    }

    return <div className="w-full p-5">
        <h1 className="text-3xl text-center mx-auto text-gray-100">{appName}</h1>
        <div className="w-full mx-auto">
            {questions.map((question, questionIndex) => 
                <QuestionComponent 
                    key={questionIndex}
                    question={`Question ${questionIndex+1}: ${question}`}
                    response={responses[questionIndex]}
                    onChange={(e) => updateResponseAtIndex(questionIndex, e.target.value)}
                />
            )}
            <QuestionComponent
                question="What is your first choice program? (put N/A if irrelevant)"
                response={divisionChoices[0]}
                onChange={(e) => updateDivisionChoiceAtIndex(0, e.target.value)}
            />
            <QuestionComponent
                question="What is your second choice program? (put N/A if irrelevant)"
                response={divisionChoices[1]}
                onChange={(e) => updateDivisionChoiceAtIndex(1, e.target.value)}
            />
            <QuestionComponent
                question="What is your third choice program? (put N/A if irrelevant)"
                response={divisionChoices[2]}
                onChange={(e) => updateDivisionChoiceAtIndex(2, e.target.value)}
            />
        </div>
        <div className="flex gap-x-4">
            <Link href="/opportunities" passHref>
                <Button>go back</Button>
            </Link>
            <Button disabled={disableSubmit} onClick={async() => {
                setDisableSubmit(true);
                await onSubmit({
                    responses,
                    divisionChoices
                });
            }}>submit</Button>
        </div>
    </div>
}