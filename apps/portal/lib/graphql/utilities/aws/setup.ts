import aws from 'aws-sdk';

export function createStepFunctionInstance() {
  aws.config.update({
    region: 'us-east-1',
  });

  return new aws.StepFunctions();
}
