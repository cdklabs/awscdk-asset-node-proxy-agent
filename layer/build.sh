#!/bin/bash
set -euo pipefail

cd $(dirname $0)

mkdir -p ../lib

echo ">> Building AWS Lambda layer inside a docker image for Proxy Agent..."

TAG='aws-lambda-node-proxy-agent'

docker=${CDK_DOCKER:-'docker'}

${docker} build -t ${TAG} .

echo ">> Extrating layer.zip from the build container..."
CONTAINER=$(${docker} run -d ${TAG})
${docker} cp ${CONTAINER}:/layer.zip ../lib/layer.zip

echo ">> Stopping container..."
${docker} rm -f ${CONTAINER}
echo ">> lib/layer.zip is ready"
