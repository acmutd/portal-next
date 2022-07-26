import { Context, Callback } from 'aws-lambda';
import aws from 'aws-sdk';
import middy from '@middy/core';
import sqsJsonBodyParser from '@middy/sqs-json-body-parser';
import Log from '@dazn/lambda-powertools-logger';
import { ValidatedSQSEvent } from '@src/types';
import { buildVanityLink, VanityReqBody } from '@src/generate-vanity';
import { uuid } from 'uuidv4';
import { PromiseResult } from 'aws-sdk/lib/request';

const baseHandler = async (
  event: ValidatedSQSEvent<VanityReqBody>,
  context: Context,
  callback: Callback
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record): Promise<PromiseResult<any, any>> => {
      const stepFunction = new aws.StepFunctions();
      const { taskToken, payload: vanityReqData } = record.body;

      try {
        Log.info(`Generating Vanity Link`);
        const { success, data } = await buildVanityLink(vanityReqData);
        Log.info(`Vanity Link Generation Success Status: ${success ? 'OK' : 'Failed'}`, {
          data,
        });
        Log.info(
          `Sending data to Step Function with the following ARN: ${process.env.SENDGRID_ARN!}`
        );
        if (!process.env.SENDGRID_ARN) {
          return await stepFunction
            .sendTaskFailure({ taskToken, error: 'No ARN for SendGrid Step Function' })
            .promise();
        }
        await stepFunction
          .startExecution({
            stateMachineArn: process.env.SENDGRID_ARN!,
            name: uuid(),
            input: JSON.stringify({
              from: 'development@acmutd.co',
              from_name: 'ACM Development',
              to: vanityReqData.email,
              template_id: process.env.VANITY_TEMPLATE_ID!,
              dynamicSubstitutions: {
                preheader: 'Successful Generation of Vanity Link',
                subject: 'Vanity Link Confirmation',
                vanity_link: `${vanityReqData.subdomain}.${vanityReqData.primaryDomain}/${vanityReqData.slashtag}`,
                first_name: vanityReqData.firstName,
                last_name: vanityReqData.lastName,
              },
            }),
          })
          .promise();
        return await stepFunction
          .sendTaskSuccess({
            taskToken,
            output: '"Task execution successful"',
          })
          .promise();
      } catch (error) {
        console.log(error);
        stepFunction.sendTaskFailure({ taskToken }, (err, data) => {
          console.log(err);
        });
      }
    })
  );
};

export const main = middy(baseHandler).use(sqsJsonBodyParser());
