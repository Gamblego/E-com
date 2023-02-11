import AccountRepository from '@src/repository/AccountRepository';

import PwdUtil from '@src/util/PwdUtil';
import {PromiseWrapper, tick} from '@src/util/AssignmentUtil';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {ACCOUNT_NOT_FOUND_ERROR, LOGIN_FAILED_ERROR, RouteError} from '@src/helper/Error';
import {IAccount} from "@src/models/Account";

// **** Functions **** //

/**
 * Login a user.
 */
async function login(username: string, password: string): Promise<IAccount> {
  // Fetch user
  const accounts: IAccount[] = await AccountRepository.getAll({
    username: username,
  });
  if(accounts.length === 0) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, ACCOUNT_NOT_FOUND_ERROR);
  }

  const account = accounts[0];
  // Check password
  const hash = (account.password ?? ''),
    pwdPassed = await PromiseWrapper(PwdUtil.compare(password, hash));
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
