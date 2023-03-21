#!/usr/bin/env node

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { CDKInfraStack } from '../lib/cdk-infra-stack';

const app = new cdk.App();
// reading context from cdk.json file
const environments = app.node.tryGetContext("ENVIRONMENTS");
const environment = environments.dev;

new CDKInfraStack(app, 'AWSCognitoSelfServiceSSOStack', {
  env: {
    account: environment.AccountId,
    region: environment.Region
  },
  context: { stage: environment.Stage, prefix: environment.Prefix }
});

app.synth();