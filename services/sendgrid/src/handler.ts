import { Context, Callback } from 'aws-lambda';
import aws from 'aws-sdk';
import middy from '@middy/core';
import sqsJsonBodyParser from '@middy/sqs-json-body-parser';
import { sendEmail, SendEmailConfig } from './send-email';
import { ValidatedSQSEvent } from './types';

const baseHandler = async (
  event: ValidatedSQSEvent<SendEmailConfig>,
  context: Context,
  callback: Callback
): Promise<void> => {
  const { Records } = event;
  const stepFunction = new aws.StepFunctions();
  try {
    await Promise.all(
      Records.map(async (record) => {
        const { taskToken, payload: emailData } = record.body;
        await sendEmail(emailData);
        await stepFunction
          .sendTaskSuccess({
            taskToken,
            output: JSON.stringify({ msg: 'Callback task successful' }),
          })
          .promise();
      })
    );
    callback(null);
  } catch (error) {
    callback(JSON.stringify(error));
  }
};

export const main = middy(baseHandler).use(sqsJsonBodyParser());
