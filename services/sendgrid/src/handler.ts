/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
import { sendEmail, SendEmailConfig } from '@src/send-email';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler';
import validator from '@middy/validator';
import { inputSchema } from '@src/schema';
import type { ValidatedAPIGatewayProxyEvent } from '@src/schema';

const sendEmailHandler = async (event: ValidatedAPIGatewayProxyEvent<SendEmailConfig>) => {
  const sendEmailStatus = await sendEmail(event.body);
  return {
    statusCode: sendEmailStatus ? 200 : 500,
    body: JSON.stringify({
      msg: sendEmailStatus ? 'Successfully sent email' : 'Unsucessfully sent email',
    }),
  };
};

export const main = middy(sendEmailHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(JSONErrorHandlerMiddleware());
