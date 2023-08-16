interface QuestionComponentProps {
    question: string;
    response: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function QuestionComponent({ question, response, onChange}: QuestionComponentProps) {
    return <div className="flex flex-col gap-y-3 mb-5">
        <h1 className="text-white text-lg">{question}</h1>
        <textarea 
            rows={4} 
            className="appearance-none block w-4/5 text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600" 
            value={response} 
            onChange={onChange} 
        />
    </div>
}