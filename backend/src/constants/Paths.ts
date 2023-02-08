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
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Account: {
    Base: '/account',
    All: '/search',
    Get: '/:accountId',
    Delete: '/:accountId'
  }
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export const DEFAULT_PATH: string = '';
export default Paths as TPaths;
