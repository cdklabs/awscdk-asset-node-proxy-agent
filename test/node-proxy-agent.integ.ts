import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import * as cr from 'aws-cdk-lib/custom-resources';

import { ASSET_FILE, LAYER_SOURCE } from '../lib';
import { hashFile } from './util';

/**
 * Test verifies that node-proxy-agent is invoked successfully inside Lambda runtime.
 */

const app = new cdk.App();
const stack = new cdk.Stack(app, 'lambda-layer-node-proxy-agent-integ-stack');
const asset = new s3_assets.Asset(stack, 'node-proxy-asset', {
  path: ASSET_FILE,
  assetHash: hashFile(LAYER_SOURCE),
});
const layer = new lambda.LayerVersion(stack, 'NodeProxyLayer', {
  code: lambda.Code.fromBucket(asset.bucket, asset.s3ObjectKey),
  description: '/opt/nodejs/node_modules/proxy-agent',
});

const provider = new cr.Provider(stack, 'ProviderNode14', {
  onEventHandler: new lambda.Function(stack, 'Lambda$Node14', {
    code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
    handler: 'index.handler',
    runtime: lambda.Runtime.NODEJS_14_X,
    layers: [layer],
    memorySize: 512,
    timeout: cdk.Duration.seconds(30),
  }),
});

new cdk.CustomResource(stack, 'CustomResourceNode14', {
  serviceToken: provider.serviceToken,
});

app.synth();