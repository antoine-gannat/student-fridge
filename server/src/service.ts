import * as auth from './controllers/auth/auth';
import * as user from './controllers/user/user';
import * as product from './controllers/products/products';

export default {
  // Auth
  signIn: auth.signIn,
  signUp: auth.signUp,
  signOut: auth.signOut,
  // Users
  currentSession: user.currentSession,
  // Products
  addProduct: product.addProduct,
  getProducts: product.getProducts
}