/**
 * Middleware to verify user logged in
 */

import {NextFunction, Request, Response} from 'express';
import {JwtPayload} from 'jsonwebtoken';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import SessionUtil from '@src/util/SessionUtil';
import {ISessionAccount} from '@src/models/Account';
import {RouteError, USER_UNAUTHORIZED_ERROR} from "@src/helper/Error";
import {Privilege} from "@src/constants/AssignmentEnums";
import logger from "jet-logger";

// **** Types **** //

type TSessionData = ISessionAccount & JwtPayload;


// **** Functions **** //

/**
 * See note at beginning of file.
 */
async function userMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Get session data
    const sessionData = await SessionUtil.getSessionData<TSessionData>(req);
    // Set session data to locals
    if(typeof sessionData === undefined) {
      res.locals.sessionUser = {
        username: '',
        privilege: Privilege.Client,
        accountId: ''
      };
    } else if (
        typeof sessionData === 'object'
    ) {
      res.locals.sessionUser = sessionData;
      logger.info(`cookie for incoming request : ${JSON.stringify(sessionData)}`);
    }
    return next();
  } catch (err: any) {
    next(err);
  }
}


// **** Export Default **** //

export default userMw;
