import { Context, Callback } from 'aws-lambda';
import aws from 'aws-sdk';
import middy from '@middy/core';
import sqsJsonBodyParser from '@middy/sqs-json-body-parser';
import Log from '@dazn/lambda-powertools-logger';
import { sendEmail, SendEmailConfig } from '@src/send-email';
import { ValidatedSQSEvent } from '@src/types';

const baseHandler = async (
  event: ValidatedSQSEvent<SendEmailConfig>,
  context: Context,
  callback: Callback
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      const stepFunction = new aws.StepFunctions();
      const { taskToken, payload: emailData } = record.body;

      const params = {
        output: '"Callback task completed successfully."',
        taskToken,
      };

      try {
        Log.info(
          `Sending email from ${emailData.from_name}(${emailData.from}) to ${emailData.to}`,
          {
            payload: emailData,
          }
        );
        await sendEmail(emailData);
        stepFunction.sendTaskSuccess(params, (err, data) => {
          if (err) {
            console.error(err.message);
            callback(err.message);
            return;
          }
          callback(null);
        });
      } catch (error) {
        stepFunction.sendTaskFailure({ taskToken, error: JSON.stringify(error) }, (err, data) => {
          console.log(err);
          callback(err.message);
        });
      }
    })
  );
};

export const main = middy(baseHandler).use(sqsJsonBodyParser());
