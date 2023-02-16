import { sendApplicationSubmissionEmail } from '../../../lib/graphql/utilities/send-email/application';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const firstName = req.body.form_response.hidden.first_name;
  const lastName = req.body.form_response.hidden.last_name;
  const email = req.body.form_response.hidden.email;
  const typeformName = req.body.form_response.definition.title;
  await sendApplicationSubmissionEmail(
    {
      first_name: firstName,
      last_name: lastName,
      typeform_id: typeformName,
    },
    email,
  );
  return res.json({ status: 'ok' });
}
