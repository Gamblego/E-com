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
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
