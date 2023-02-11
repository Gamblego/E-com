import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import AuthService from '@src/services/AuthenticationService';

import { IReq, IRes } from '@src/constants/AssignmentInterfaces';
import {IAccount, ISessionAccount} from "@src/models/Account";
import {INVALID_REQUEST_ERROR, RouteError, USER_UNAUTHORIZED_ERROR} from "@src/helper/Error";
import {PromiseWrapper} from "@src/util/AssignmentUtil";


// **** Types **** //

interface ILoginReq {
  username: string;
  password: string;
}


// **** Functions **** //

/**
 * callback responsible for user login request
 *
 * @param request the request object
 * @param response the response object
 * @returns promise containing the response object with status code OK
 *
 * @remarks adds a session cookie to the response object
 */
async function login(request: IReq<ILoginReq>, response: IRes): Promise<IRes> {
  const { username, password } = request.body;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  // If user is already logged in then login is invalid
  if(webToken.accountId !== '') {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
  }
  // Login
  const account: IAccount = await PromiseWrapper(AuthService.login(username, password));
  // Setup Admin Cookie
  await SessionUtil.addSessionData(response, {
    id: account.accountId,
    username: account.username,
    role: account.privilege,
  });
  // Return
  return response.status(HttpStatusCodes.OK).end();
}

/**
 * callback responsible for user logout request
 *
 * @param request the request object
 * @param response the response object
 * @returns the response object with status code OK
 *
 * @remarks clears the session cookie associated with the request
 */
function logout(request: IReq, response: IRes): IRes {
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.accountId !== '') {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }
  SessionUtil.clearCookie(response);
  return response.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  login,
  logout,
} as const;
