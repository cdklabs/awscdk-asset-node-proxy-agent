import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodeProxyAgentAsset } from '../lib';

test('synthesized to a layer version', () => {
  // GIVEN
  const stack = new Stack();
  const asset = new NodeProxyAgentAsset(stack, 'layer-asset');

  // WHEN
  new lambda.LayerVersion(stack, 'MyLayer', {
    code: lambda.Code.fromBucket(asset.bucket, asset.s3ObjectKey),
    description: '/opt/nodejs/node_modules/proxy-agent',
  });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/nodejs/node_modules/proxy-agent',
  });
});
