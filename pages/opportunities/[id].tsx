import {useRouter} from 'next/router';
import { GetServerSideProps } from "next";
import { gqlQueries, queryClient } from "src/api";
import { dehydrate, useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import ApplicationForm from 'components/applications/ApplicationForm';

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    await queryClient.prefetchQuery(['fillApplicationPage'], () =>
        gqlQueries.getSingleApplicationData({
            where: {
                id: {
                    equals: ctx.query.id! as string
                }
            }
        }),
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}


export default function FillApplicationPage() {
    const { status, data: signedInUserData } = useSession({ required: true });
    const router = useRouter();
    const { data } = useQuery(
        ['fillApplicationPage'],
        () => 
        gqlQueries.getSingleApplicationData({
            where: {
                id: {
                    equals: router.query.id! as string
                }
            }
        }),
        {
            enabled: status === "authenticated"
        }
    );

    return <ApplicationForm 
        questions={data!.applications[0].questions}
        appName={data!.applications[0].name}
        onSubmit={async (formData) => {
            await gqlQueries.submitSingleApplication({
                data: {
                    profile: {
                        connect: {
                            email: signedInUserData!.user!.email!
                        }
                    },
                    app: {
                        connect: {
                            id: router.query.id! as string
                        }
                    },
                    responses: {
                        set: formData.responses
                    },
                    status: "pending",
                    first: formData.divisionChoices[0],
                    second: formData.divisionChoices[1],
                    third: formData.divisionChoices[2],
                    interviewLink: '',
                    notes: '',
                    score: 1
                }
            });
            alert("Your submission is successfully recorded. A confirmation email will be sent to you shortly");
            router.push("/opportunities");
        }}
    />
}