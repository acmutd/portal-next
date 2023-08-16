import * as AWS from '@aws-sdk/client-sfn';

export function createStepFunctionInstance() {
  return new AWS.SFNClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACM_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_ACM_SECRET_KEY!
    }
  });
}
