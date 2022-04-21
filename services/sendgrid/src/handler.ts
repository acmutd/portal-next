/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
import { sendEmail, SendEmailConfig } from '@src/send-email';
import { SQSHandler } from 'aws-lambda';
import aws from 'aws-sdk';

export const main: SQSHandler = async (event, context, callback) => {
  const { Records } = event;
  const stepFunction = new aws.StepFunctions();
  try {
    await Promise.all(
      Records.map(async (record) => {
        const messageBody = JSON.parse(record.body);
        const { taskToken } = messageBody;
        const emailData = messageBody.payload as SendEmailConfig;
        await sendEmail(emailData);
        await stepFunction
          .sendTaskSuccess({
            taskToken,
            output: JSON.stringify({ msg: 'Callback task successful' }),
          })
          .promise();
        callback(null);
      })
    );
  } catch (error) {
    console.log(error);
    callback(JSON.stringify(error));
  }
};
