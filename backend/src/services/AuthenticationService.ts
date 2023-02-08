import AccountRepository from '@src/repository/AccountRepository';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/helper/Error';
import {IAccount} from "@src/models/Account";


// **** Variables **** //

// Errors
export const Errors = {
  unAuth: 'Unauthorized',
  AccountNotFound(username: string) {
    return `Account with username "${username}" not found`;
  },
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(username: string, password: string): Promise<IAccount> {
  // Fetch user
  const account: IAccount = await AccountRepository.getOne(username);
  if (!account) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.AccountNotFound(username),
    );
  }
  // Check password
  const hash = (account.password ?? ''),
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.unAuth,
    );
  }
  // Return
  return account;
}


// **** Export default **** //

export default {
  login,
} as const;
