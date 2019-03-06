const sendProduct = require('./send-product');
const createProduct = require('./create-product');
const sendAllProducts = require('./send-all-products');

const handleProductsRoute = (request, response) => {
  const reqMethod = request.method;
  const reqUrl = request.url;

  if (reqMethod === 'GET' && reqUrl === '/products') {
    sendAllProducts(request, response);
    return;
  }

  if (reqMethod === 'GET') {
    sendProduct(request, response);
    return;
  }  

  if (reqMethod === 'POST') {
    createProduct(request, response);
  }
};

module.exports = handleProductsRoute;