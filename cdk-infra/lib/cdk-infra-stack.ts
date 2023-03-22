import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import {
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_ssm as ssm,
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

    /**************************************************************
     * S3 DEPLOYMENT BUCKET 
    **************************************************************/

    const uiBucket = new s3.Bucket(this, 'UIBucket', {
      bucketName: `${prefix}-ui-${stage}`,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: false,
      websiteIndexDocument: 'index.html',
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "UIDeploymentBucketOAI", {
      comment: "UI-DeploymentBucket-OAI"
    });
    uiBucket.grantRead(originAccessIdentity);

    new ssm.StringParameter(this, 'uiDeploymentBucketNameParam', {
      description: 'Name of the deployment Bucket',
      parameterName: `/${prefix}/bucket/uiDeploymentBucketName`,
      stringValue: uiBucket.bucketName
    });

    /**************************************************************
     * CLOUDFRONT DISTRIBUTION 
    **************************************************************/
    const cloudFrontWebDistribution = new cloudfront.CloudFrontWebDistribution(this, "UIDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            // id: `${props.envObject.Prefix}-build`,
            s3BucketSource: uiBucket,
            originAccessIdentity: originAccessIdentity,
            originPath: "/build" },
          behaviors: [
            { isDefaultBehavior: true }
          ],
        }
      ],
      comment: "UI Distribution"
    });
    
    //set a parameter for the cloudfront url
    new ssm.StringParameter(this, 'UICloudFrontURL', {
      description: 'UI CloudFront url',
      parameterName: `/${prefix}/cloudfront/distributionUrl`,
      stringValue: `https://${cloudFrontWebDistribution.distributionDomainName}`
    });

    //set a parameter for the cloudfront destribution id
    new ssm.StringParameter(this, 'UICloudFrontDistributionId', {
      description: 'UI CloudFront Distribution ID',
      parameterName: `/${prefix}/cloudfront/distributionId`,
      stringValue: cloudFrontWebDistribution.distributionId
    });

    /**************************************************************
     * OUTPUTS 
    **************************************************************/

    new CfnOutput(this, 'BucketArn', { value: uiBucket.bucketArn });
    new CfnOutput(this, "UIDeploymentBucketName", { value: uiBucket.bucketName});
    new CfnOutput(this, "cloudFrontUrl", { value: `https://${cloudFrontWebDistribution.distributionDomainName}`});
    new CfnOutput(this, "cloudFrontDistributionId", { value: cloudFrontWebDistribution.distributionId});
  }
}