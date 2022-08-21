import aws from 'aws-sdk';
import { v4 as uuid } from 'uuid';

function createStepFunctionInstance() {
  aws.config.update({
    region: 'us-east-1',
  });

  return new aws.StepFunctions();
}

interface SendEmailPayload<SubstitutionsType> {
  template_id: string;
  dynamicSubstitutions: SubstitutionsType;
}

export async function sendEmail<SubstitutionsType>(
  payload: SendEmailPayload<SubstitutionsType>,
  recipientEmail: string,
) {
  const stepFunction = createStepFunctionInstance();
  return stepFunction
    .startExecution({
      stateMachineArn: process.env.SENDGRID_ARN!,
      name: uuid(),
      input: JSON.stringify({
        ...payload,
        from: 'development@acmutd.co',
        from_name: 'ACM Development',
        to: recipientEmail,
      }),
    })
    .promise();
}
