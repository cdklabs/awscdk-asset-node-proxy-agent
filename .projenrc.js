const { awscdk, JsonPatch } = require('projen');

const SPEC_VERSION = '5';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services',
  cdkVersion: '2.0.0',
  defaultReleaseBranch: 'main',
  name: `@awscdk/asset-node-proxy-agent-v${SPEC_VERSION}`,
  repositoryUrl: 'https://github.com/cdklabs/awscdk-asset-node-proxy-agent.git',
  homepage: 'https://github.com/cdklabs/awscdk-asset-node-proxy-agent#readme',
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
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
});

// These patches are required to enable sudo commands in the workflows under `workflowBootstrapSteps`,
// see `workflowBootstrapSteps` above for why a sudo command is needed.
const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml');
buildWorkflow.patch(JsonPatch.add('/jobs/build/container/options', '--group-add sudo'));
const releaseWorkflow = project.tryFindObjectFile('.github/workflows/release.yml');
releaseWorkflow.patch(JsonPatch.add('/jobs/release/container/options', '--group-add sudo'));
const upgradeWorkflow = project.tryFindObjectFile('.github/workflows/upgrade-main.yml');
upgradeWorkflow.patch(JsonPatch.add('/jobs/upgrade/container/options', '--group-add sudo'));

project.preCompileTask.exec('layer/build.sh');

project.synth();