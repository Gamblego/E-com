/**
 * Middleware to verify user logged in and is an admin.
 */

import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import SessionUtil from '@src/util/SessionUtil';
import { ISessionAccount } from '@src/models/Account';
import {RouteError, USER_UNAUTHORIZED_ERROR} from "@src/helper/Error";

// **** Types **** //

type TSessionData = ISessionAccount & JwtPayload;


// **** Functions **** //

/**
 * See note at beginning of file.
 */
async function adminMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get session data
  const sessionData = await SessionUtil.getSessionData<TSessionData>(req);
  // Set session data to locals
  if (
    typeof sessionData === 'object' &&
    'privilege' in sessionData
  ) {
    res.locals.sessionUser = sessionData;
    return next();
  // Return an unauth error if user is not an admin
  } else {
    return next(new RouteError(HttpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR));
  }
}


// **** Export Default **** //

export default adminMw;
