/**
 * Middleware to verify user logged in and is an admin.
 */

import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import EnvVars from '@src/constants/EnvVars';

import SessionUtil from '@src/util/SessionUtil';
import { ISessionAccount } from '@src/models/Account';
import { Privilege } from '@src/constants/AssignmentEnums';


// **** Variables **** //

const USER_UNAUTHORIZED_ERR = 'User not authorized to perform this action';


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
    sessionData?.role === Privilege.Admin
  ) {
    res.locals.sessionUser = sessionData;
    return next();
  // Return an unauth error if user is not an admin
  } else {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: USER_UNAUTHORIZED_ERR });
  }
}


// **** Export Default **** //

export default adminMw;
