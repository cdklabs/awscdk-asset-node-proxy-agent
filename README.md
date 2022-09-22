# AWS Lambda Layer with the NPM dependency proxy-agent
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

---

> This library is currently under development. Do not use!

<!--END STABILITY BANNER-->

This module exports a single class called `NodeProxyAgentAsset` which is an `s3_assets.Asset` that bundles the NPM dependency [`proxy-agent`](https://www.npmjs.com/package/proxy-agent).

> - proxy-agent Version: 5.0.0

Usage:

```ts
import { NodeProxyAgentAsset } from '@aws-cdk/asset-node-proxy-agent';
import * as lambda from 'aws-cdk-lib/aws-lambda';

declare const fn: lambda.Function;
const proxyAgent = new NodeProxyAgentAsset(this, 'ProxyAgent');
fn.addLayers(new lambda.LayerVersion(this, 'ProxyAgentLayer', {
  code: lambda.Code.fromBucket(proxyAgent.bucket, proxyAgent.s3ObjectKey),
}));
```

[`proxy-agent`](https://www.npmjs.com/package/proxy-agent) will be installed under `/nodejs/node_modules`.
