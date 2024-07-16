const proxyAgent = require('proxy-agent');

exports.handler = (_) => {
  new proxyAgent.ProxyAgent();
};
