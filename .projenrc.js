const { awscdk, JsonPatch, DependencyType } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');

// the version of proxy-agent that this branch supports
const SPEC_VERSION = '5';
const releaseWorkflowName = `release-node-proxy-agent-v${SPEC_VERSION}`;

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services',
  cdkVersion: '2.0.0',
  defaultReleaseBranch: 'main',
  name: `@aws-cdk/asset-node-proxy-agent-v${SPEC_VERSION}`,
  repositoryUrl: 'https://github.com/cdklabs/awscdk-asset-node-proxy-agent.git',
  homepage: 'https://github.com/cdklabs/awscdk-asset-node-proxy-agent#readme',
  autoApproveOptions: {
    allowedUsernames: ['aws-cdk-automation'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  workflowBootstrapSteps: [
    {
      // This step is required to allow the build workflow to build docker images
      name: 'Change permissions on /var/run/docker.sock',
      run: 'sudo chown superchain /var/run/docker.sock',
    },
  ],
  majorVersion: 2,
  npmAccess: NpmAccess.PUBLIC,
  releaseTagPrefix: `node-proxy-agent-v${SPEC_VERSION}`,
  releaseWorkflowName: releaseWorkflowName,
  defaultReleaseBranch: 'main',
  publishToPypi: {
    distName: `aws-cdk.asset-node-proxy-agent-v${SPEC_VERSION}`,
    module: `aws_cdk.asset_node_proxy_agent_v${SPEC_VERSION}`,
  },
  publishToMaven: {
    javaPackage: `software.amazon.awscdk.cdk.asset.node.proxy.agent.v${SPEC_VERSION}`,
    mavenGroupId: 'software.amazon.awscdk',
    mavenArtifactId: `cdk-asset-node-proxy-agent-v${SPEC_VERSION}`,
    mavenEndpoint: 'https://aws.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: `Amazon.CDK.Asset.NodeProxyAgentV${SPEC_VERSION}`,
    packageId: `Amazon.CDK.Asset.NodeProxyAgentV${SPEC_VERSION}`,
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/awscdk-asset-node-proxy-agent-go',
    packageName: `nodeproxyagentv${SPEC_VERSION}`,
    gitUserName: 'AWS CDK Team',
    gitUserEmail: 'aws-cdk@amazon.com',
    githubTokenSecret: 'PROJEN_GITHUB_TOKEN',
  },
});

// We only need aws-cdk-lib and constructs for testing. Neither library is used
// in the public API.
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs@^10.0.5', DependencyType.DEVENV);
project.deps.removeDependency('aws-cdk-lib', DependencyType.PEER);
project.deps.addDependency('aws-cdk-lib@^2.0.0', DependencyType.DEVENV);

// These patches are required to enable sudo commands in the workflows under `workflowBootstrapSteps`,
// see `workflowBootstrapSteps` above for why a sudo command is needed.
const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml');
buildWorkflow.patch(JsonPatch.add('/jobs/build/container/options', '--group-add sudo'));
const releaseWorkflow = project.tryFindObjectFile(`.github/workflows/${releaseWorkflowName}.yml`);
releaseWorkflow.patch(JsonPatch.add('/jobs/release/container/options', '--group-add sudo'));
const upgradeWorkflow = project.tryFindObjectFile('.github/workflows/upgrade-main.yml');
upgradeWorkflow.patch(JsonPatch.add('/jobs/upgrade/container/options', '--group-add sudo'));

project.preCompileTask.exec('layer/build.sh');

project.synth();
