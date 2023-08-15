import aws from 'aws-sdk';

export function createStepFunctionInstance() {
  aws.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACM_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACM_SECRET_KEY
  });

  return new aws.StepFunctions();
}
