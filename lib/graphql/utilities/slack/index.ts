import { createStepFunctionInstance } from '../aws/setup';
import { v4 as uuid } from 'uuid';
import { StartExecutionCommand } from '@aws-sdk/client-sfn';

interface SlackNotificationPayload {
  form_name: string;
  name: string;
  email: string;
  message?: string;
  url?: string;
}

export async function sendSlackNotification(payload: SlackNotificationPayload) {
  const stepFunction = createStepFunctionInstance();
  const command = new StartExecutionCommand({
    stateMachineArn: process.env.SLACK_ARN!,
    name: uuid(),
    input: JSON.stringify(payload),
  });
  return stepFunction.send(command);
}
