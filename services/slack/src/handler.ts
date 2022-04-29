/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */

import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler';
import validator from '@middy/validator';
import { inputSchema } from './schema';
import type { ValidatedAPIGatewayProxyEvent } from './schema';
import { sendSlackMessage, SendSlackMessageConfig } from './send-slack-message';

const sendSlackMessageHandler = async (
  event: ValidatedAPIGatewayProxyEvent<SendSlackMessageConfig>
) => {
  const sendSlackMessageStatus = await sendSlackMessage(event.body);
  return {
    statusCode: sendSlackMessageStatus ? 200 : 500,
    body: JSON.stringify({
      msg: sendSlackMessageStatus ? 'Successfully sent message' : 'Unsuccessfully sent message',
    }),
  };
};

export const main = middy(sendSlackMessageHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(JSONErrorHandlerMiddleware());
