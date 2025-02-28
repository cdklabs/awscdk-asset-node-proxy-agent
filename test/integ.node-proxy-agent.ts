import * as path from 'path';
import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import * as cr from 'aws-cdk-lib/custom-resources';
import { LAMBDA_CREATE_NEW_POLICIES_WITH_ADDTOROLEPOLICY } from 'aws-cdk-lib/cx-api';

import { ASSET_FILE, LAYER_SOURCE_DIR } from '../lib';

/**
 * Test verifies that node-proxy-agent is invoked successfully inside Lambda runtime.
 */

const app = new cdk.App({
  postCliContext: {
    [LAMBDA_CREATE_NEW_POLICIES_WITH_ADDTOROLEPOLICY]: false,
  },
});

const stack = new cdk.Stack(app, 'lambda-layer-node-proxy-agent-integ-stack');
const asset = new s3_assets.Asset(stack, 'node-proxy-asset', {
  path: ASSET_FILE,
  assetHash: cdk.FileSystem.fingerprint(LAYER_SOURCE_DIR),
});
const layer = new lambda.LayerVersion(stack, 'NodeProxyLayer', {
  code: lambda.Code.fromBucket(asset.bucket, asset.s3ObjectKey),
  description: '/opt/nodejs/node_modules/proxy-agent',
});

const provider = new cr.Provider(stack, 'ProviderNode20', {
  onEventHandler: new lambda.Function(stack, 'Lambda$Node20', {
    code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
    handler: 'index.handler',
    runtime: lambda.Runtime.NODEJS_20_X,
    layers: [layer],
    memorySize: 512,
    timeout: cdk.Duration.seconds(30),
  }),
});

new cdk.CustomResource(stack, 'CustomResourceNode20', {
  serviceToken: provider.serviceToken,
});

new IntegTest(app, 'integ-test', {
  testCases: [stack],
  stackUpdateWorkflow: false,
});
