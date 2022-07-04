import { Context, Callback } from 'aws-lambda';
import aws from 'aws-sdk';
import middy from '@middy/core';
import sqsJsonBodyParser from '@middy/sqs-json-body-parser';
import Log from '@dazn/lambda-powertools-logger';
import { ValidatedSQSEvent } from '@src/types';
import { sendSlackMessage, SendSlackMessageConfig } from '@src/send-slack-message';

const baseHandler = async (
  event: ValidatedSQSEvent<SendSlackMessageConfig>,
  context: Context,
  callback: Callback
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      const stepFunction = new aws.StepFunctions();
      const { taskToken, payload: slackMessageData } = record.body;

      const params = {
        output: '"Callback task completed successfully."',
        taskToken,
      };

      try {
        Log.info(`Sending slack message from ${slackMessageData.name}(${slackMessageData.email})`, {
          payload: slackMessageData,
        });
        await sendSlackMessage(slackMessageData);
        await stepFunction.sendTaskSuccess(params).promise();
      } catch (error) {
        stepFunction.sendTaskFailure({ taskToken, error: JSON.stringify(error) }, (err, data) => {
          console.log(err);
        });
      }
    })
  );
};

export const main = middy(baseHandler).use(sqsJsonBodyParser());
