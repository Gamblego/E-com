/**
 * Express router paths go here.
 */

import { Immutable } from '@src/helper/types';


const Paths = {
  Base: '/api',
  Docs: {
    Base: '/docs'
  },
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
  },
  Users: {
    Base: '/user',
    All: '/search',
    Get: '/:userId',
    Delete: '/delete/:userId',
  },
  Account: {
    Base: '/account',
    All: '/search',
    Get: '/:accountId',
    Delete: '/:accountId'
  },
  Product: {
    Base: '/product',
    All: '/search',
    Get: '/:productId',
    Delete: '/:productId'
  }
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export const DEFAULT_PATH: string = '';
export default Paths as TPaths;
