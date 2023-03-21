import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import {
  aws_s3 as s3,
} from 'aws-cdk-lib';

interface MyStackProps extends StackProps {
  context: {
    stage: string; // dev, test, prod
    prefix: string; // prefix for all resources
  };
}

export class CDKInfraStack extends Stack {
  constructor(scope: App, id: string, props?: MyStackProps) {
    super(scope, id, props);

    const { stage, prefix } = props?.context || {};

    const bucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: `${prefix}-ui-${stage}`,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: false,
      websiteIndexDocument: 'index.html',
    });

    new CfnOutput(this, 'exampleBucketArn', { value: bucket.bucketArn });
  }
}