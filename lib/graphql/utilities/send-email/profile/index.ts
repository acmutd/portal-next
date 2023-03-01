import { sendEmail } from '../general';

interface ProfileCreationSubstitutionsType {
  first_name: string;
}

export async function sendProfileCreationEmail(
  payload: ProfileCreationSubstitutionsType,
  recipientEmail: string,
) {
  return sendEmail<ProfileCreationSubstitutionsType>(
    {
      dynamicSubstitutions: payload,
      template_id: process.env.PROFILE_TEMPLATE_ID!,
    },
    recipientEmail,
  );
}
