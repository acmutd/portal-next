import { SFNClient } from '@aws-sdk/client-sfn';

export function createStepFunctionInstance() {
  return new SFNClient({
    region: 'us-east-1',
  });
}
