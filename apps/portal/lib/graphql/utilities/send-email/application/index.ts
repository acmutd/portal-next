import { sendEmail } from '../general';

interface ApplicationCreationSubstitutionsType {
  typeform_name: string;
  form_link: string;
  external_link: string;
  description: string;
  subject: string;
  preheader?: string;
}

interface ApplicationSubmissionSubstitutionsType {
  first_name: string;
  last_name: string;
  typeform_id: string;
}

export async function sendApplicationCreationEmail(
  payload: ApplicationCreationSubstitutionsType,
  recipientEmail: string,
) {
  return sendEmail<ApplicationCreationSubstitutionsType>(
    {
      dynamicSubstitutions: payload,
      template_id: process.env.APPLICATION_TEMPLATE_ID!,
    },
    recipientEmail,
  );
}

export async function sendApplicationSubmissionEmail(
  payload: ApplicationSubmissionSubstitutionsType,
  recipientEmail: string,
) {
  return sendEmail<typeof payload>(
    {
      dynamicSubstitutions: payload,
      template_id: process.env.APPLICATION_THANK_YOU!,
    },
    recipientEmail,
  );
}
