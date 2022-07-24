import { gql, useMutation, useQuery } from 'urql';
import { Widget } from '@typeform/embed-react';

export default function ApplicationPage() {
  /*
  const APPLICATION_QUESTIONS_QUERY = gql`
    query Query($where: )
  ` */

  return (
    <div className="w-screen grid place-items-center gap-2">
      <h1>Testing Boundaries</h1>
      <Widget id="rZfmLZaS" width={800} height={800} opacity={80} className="my-form" />
    </div>
  );
}
