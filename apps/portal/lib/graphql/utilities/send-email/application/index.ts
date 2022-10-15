import { sendEmail } from '../general';

interface ApplicationCreationSubstitutionsType {
  typeform_name: string;
  form_link: string;
  external_link: string;
  description: string;
  subject: string;
  preheader?: string;
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
