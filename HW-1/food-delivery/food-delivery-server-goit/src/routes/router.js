const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');
const signUpRoute = require('./users/sign-up-route');
const productsRoute = require('./products/products');

const router = {
  '/signup': signUpRoute,
  '/motocycle': motocycleRoute,
  '/products': productsRoute,
  default: mainRoute
};

module.exports = router;
