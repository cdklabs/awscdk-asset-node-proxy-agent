"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeProxyAgentLayer = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const lambda = require("@aws-cdk/aws-lambda");
/**
 * An AWS Lambda layer that includes the NPM dependency `proxy-agent`.
 */
class NodeProxyAgentLayer extends lambda.LayerVersion {
    constructor(scope, id) {
        super(scope, id, {
            code: lambda.Code.fromAsset(path.join(__dirname, 'layer.zip'), {
                // we hash the Dockerfile (it contains the tools versions) because hashing the zip is non-deterministic
                assetHash: hashFile(path.join(__dirname, '..', 'layer', 'Dockerfile')),
            }),
            description: '/opt/nodejs/node_modules/proxy-agent',
        });
    }
}
exports.NodeProxyAgentLayer = NodeProxyAgentLayer;
_a = JSII_RTTI_SYMBOL_1;
NodeProxyAgentLayer[_a] = { fqn: "@aws-cdk/lambda-layer-node-proxy-agent.NodeProxyAgentLayer", version: "0.0.0" };
function hashFile(fileName) {
    return crypto
        .createHash('sha256')
        .update(fs.readFileSync(fileName))
        .digest('hex');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm94eS1hZ2VudC1sYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGUtcHJveHktYWdlbnQtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw4Q0FBOEM7QUFHOUM7O0dBRUc7QUFDSCxNQUFhLG1CQUFvQixTQUFRLE1BQU0sQ0FBQyxZQUFZO0lBQzFELFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxFQUFFO2dCQUM3RCx1R0FBdUc7Z0JBQ3ZHLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN2RSxDQUFDO1lBQ0YsV0FBVyxFQUFFLHNDQUFzQztTQUNwRCxDQUFDLENBQUM7S0FDSjs7QUFUSCxrREFVQzs7O0FBRUQsU0FBUyxRQUFRLENBQUMsUUFBZ0I7SUFDaEMsT0FBTyxNQUFNO1NBQ1YsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG4vKipcbiAqIEFuIEFXUyBMYW1iZGEgbGF5ZXIgdGhhdCBpbmNsdWRlcyB0aGUgTlBNIGRlcGVuZGVuY3kgYHByb3h5LWFnZW50YC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vZGVQcm94eUFnZW50TGF5ZXIgZXh0ZW5kcyBsYW1iZGEuTGF5ZXJWZXJzaW9uIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICdsYXllci56aXAnKSwge1xuICAgICAgICAvLyB3ZSBoYXNoIHRoZSBEb2NrZXJmaWxlIChpdCBjb250YWlucyB0aGUgdG9vbHMgdmVyc2lvbnMpIGJlY2F1c2UgaGFzaGluZyB0aGUgemlwIGlzIG5vbi1kZXRlcm1pbmlzdGljXG4gICAgICAgIGFzc2V0SGFzaDogaGFzaEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ2xheWVyJywgJ0RvY2tlcmZpbGUnKSksXG4gICAgICB9KSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnL29wdC9ub2RlanMvbm9kZV9tb2R1bGVzL3Byb3h5LWFnZW50JyxcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNoRmlsZShmaWxlTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBjcnlwdG9cbiAgICAuY3JlYXRlSGFzaCgnc2hhMjU2JylcbiAgICAudXBkYXRlKGZzLnJlYWRGaWxlU3luYyhmaWxlTmFtZSkpXG4gICAgLmRpZ2VzdCgnaGV4Jyk7XG59XG4iXX0=