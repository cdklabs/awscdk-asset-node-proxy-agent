import { FileSystem, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ASSET_FILE, LAYER_SOURCE_DIR } from '../lib';

test('synthesized to a layer version', () => {
  //GIVEN
  const stack = new Stack();

  // WHEN
  new lambda.LayerVersion(stack, 'MyLayer', {
    code: lambda.Code.fromAsset(ASSET_FILE, {
      assetHash: FileSystem.fingerprint(LAYER_SOURCE_DIR),
    }),
    description: '/opt/nodejs/node_modules/proxy-agent',
  });

  // THEN
  Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
    Description: '/opt/nodejs/node_modules/proxy-agent',
  });
});
