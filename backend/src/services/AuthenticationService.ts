import AccountRepository from '@src/repository/AccountRepository';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {ACCOUNT_NOT_FOUND_ERROR, LOGIN_FAILED_ERROR, RouteError} from '@src/helper/Error';
import {IAccount} from "@src/models/Account";

// **** Functions **** //

/**
 * Login a user.
 */
async function login(username: string, password: string): Promise<IAccount> {
  // Fetch user
  const account: IAccount | null = await AccountRepository.getOne(username);
  if (!account) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      ACCOUNT_NOT_FOUND_ERROR
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
      LOGIN_FAILED_ERROR
    );
  }
  // Return
  return account;
}


// **** Export default **** //

export default {
  login,
} as const;
