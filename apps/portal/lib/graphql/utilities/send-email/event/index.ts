import { sendEmail } from '../general';

interface EventCreationSubstitutionsType {
  first_name: string;
  last_name: string;
  name: string;
  checkin_link: string;
  date: string;
  public_event: boolean;
  subject: string;
  preheader?: string;
}

export async function sendEventCreationEmail(
  payload: EventCreationSubstitutionsType,
  recipientEmail: string,
) {
  return sendEmail<EventCreationSubstitutionsType>(
    {
      dynamicSubstitutions: payload,
      template_id: process.env.EVENT_TEMPLATE_ID!,
    },
    recipientEmail,
  );
}
