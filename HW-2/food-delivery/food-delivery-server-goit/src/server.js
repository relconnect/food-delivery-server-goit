const http = require('http');
const url = require('url');
const https = require('https');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const router = require('./routes/router');

const logger = morgan('combined');
const sslKeyPath = path.join(
  __dirname,'../ssl/server.key');

  const sslCertPath = path.join(
    __dirname,'../ssl/server.crt');

const options = {
  key: fs.readFileSync(sslKeyPath),
  cert: fs.readFileSync(sslCertPath)
};

const startServer = port => {

  const server = https.createServer(options,(request, response) => {

    // Get route from the request
    const parsedUrl = url.parse(request.url);
    
    // Get router function
    const func = router[parsedUrl.pathname] || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};

module.exports = startServer;
