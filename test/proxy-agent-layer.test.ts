import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ASSET_FILE, LAYER_SOURCE } from '../lib';
import { hashFile } from './util';

test('synthesized to a layer version', () => {
  //GIVEN
  const stack = new Stack();

  // WHEN
  new lambda.LayerVersion(stack, 'MyLayer', {
    code: lambda.Code.fromAsset(ASSET_FILE, {
      assetHash: hashFile(LAYER_SOURCE),
    }),
    description: '/opt/nodejs/node_modules/proxy-agent',
  });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/nodejs/node_modules/proxy-agent',
  });
});
