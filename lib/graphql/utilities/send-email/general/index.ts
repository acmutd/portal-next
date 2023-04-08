import { createStepFunctionInstance } from '../../aws/setup';
import { v4 as uuid } from 'uuid';
import { StartExecutionCommand } from '@aws-sdk/client-sfn';

interface SendEmailPayload<SubstitutionsType> {
  template_id: string;
  dynamicSubstitutions: SubstitutionsType;
}

export async function sendEmail<SubstitutionsType>(
  payload: SendEmailPayload<SubstitutionsType>,
  recipientEmail: string,
) {
  const stepFunction = createStepFunctionInstance();
  const command = new StartExecutionCommand({
    stateMachineArn: process.env.SENDGRID_ARN!,
    name: uuid(),
    input: JSON.stringify({
      ...payload,
      from: 'development@acmutd.co',
      from_name: 'ACM Development',
      to: recipientEmail,
    }),
  });
  return stepFunction.send(command);
}
