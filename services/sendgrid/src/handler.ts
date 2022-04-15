/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { validateRequest } from '@src/validate-request';
import { sendEmail, SendEmailConfig } from '@src/send-email';

export const sendEmailHandler = async (event: APIGatewayProxyEvent) => {
  const eventBody = JSON.parse(event.body || '{}') as SendEmailConfig;
  if (!validateRequest(eventBody)) {
    return {
      msg: 'Missing fields',
    };
  }

  const sendEmailStatus = await sendEmail(eventBody);
  return {
    msg: sendEmailStatus ? 'Successfully sent email' : 'Unsucessfully sent email',
  };
};
