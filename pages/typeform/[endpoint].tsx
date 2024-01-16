import { Widget } from '@typeform/embed-react'
import ErrorComponent from 'components/ErrorComponent';
import LoadingComponent from 'components/LoadingComponent';
import { GraphQLError } from 'graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api'

export default function TypeformApplicationWidgetView() {
  const router = useRouter();
  useEffect(() => {
    const navbarObj = (document.getElementById("portal-navbar") || document.getElementById("portal-navbar-mobile"))!;
    navbarObj.style.display = "none";

    // document.getElementById("portal-navbar-mobile")!.style.width = "0px";
  }, []);
  const { data, error, isLoading } = useQuery(["widgetViewUserData"], () => gqlQueries.getUserDataForWidgetView(
    {
      where: {
        endpoint: {
          equals: router.query.endpoint as string
        }
      }
    }
  ));
  if (isLoading) return <LoadingComponent />;
  if (error) {
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions.code as string}
        errorMessage={(error as GraphQLError).message}
      />
    )
  }
  if (!data!.findFirstTypeformApplication) {
    return <div className="p-3 text-white font-bold">
      404: No such typeform exists. Please make sure that your endpoint is correct!
    </div>
  }

  return <Widget className='h-screen' id={data!.findFirstTypeformApplication.typeformId} hidden={{
    email: data!.me!.profile?.email || "",
    first_name: data!.me.profile?.firstName || "",
    last_name: data!.me.profile?.lastName || "",
    major: data!.me!.profile?.major || "",
    net_id: data!.me!.profile?.netid || "",
    classification: data!.me!.profile?.classStanding || ""
  }} />
}