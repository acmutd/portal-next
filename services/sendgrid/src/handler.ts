import { Context, Callback } from 'aws-lambda';
import aws from 'aws-sdk';
import middy from '@middy/core';
import sqsJsonBodyParser from '@middy/sqs-json-body-parser';
import Log from '@dazn/lambda-powertools-logger';
import { sendEmail, SendEmailConfig } from './send-email';
import { ValidatedSQSEvent } from './types';

const baseHandler = async (
  event: ValidatedSQSEvent<SendEmailConfig>,
  context: Context,
  callback: Callback
): Promise<void> => {
  const { Records } = event;
  const stepFunction = new aws.StepFunctions();
  await Promise.all(
    Records.map(async (record) => {
      const { taskToken, payload: emailData } = record.body;
      try {
        await sendEmail(emailData);
        return await stepFunction
          .sendTaskSuccess({
            taskToken,
            output: JSON.stringify({ msg: 'Email sent successful' }),
          })
          .promise();
      } catch (error) {
        await stepFunction.sendTaskFailure({ taskToken }).promise();
        Log.error('Send Email failed', error as Error);
      }
    })
  );
  callback(null);
};

export const main = middy(baseHandler).use(sqsJsonBodyParser());
