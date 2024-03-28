import { StartExecutionCommand } from '@aws-sdk/client-sfn';
import { createStepFunctionInstance } from '../aws/setup';
import { v4 as uuid } from 'uuid';

interface VanityLinkPayload {
  firstName: string;
  lastName: string;
  email: string;
  destination: string;
  primaryDomain: string;
  subdomain: string;
  slashtag: string;
}

export async function generateVanityLink(payload: VanityLinkPayload) {
  const stepFunction = createStepFunctionInstance();

  return stepFunction.send(new StartExecutionCommand({
    stateMachineArn: process.env.VANITY_ARN!,
    name: uuid(),
    input: JSON.stringify(payload),
  }));

}

