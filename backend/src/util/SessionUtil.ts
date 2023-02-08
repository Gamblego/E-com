import {Request, Response} from 'express';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {INVALID_REQUEST_ERROR, JWT_VALIDATION_ERROR, RouteError} from '@src/helper/Error';
import jsonwebtoken from 'jsonwebtoken';

import EnvVars from '../constants/EnvVars';
import {IError} from "@src/schemaobjects/IError";


// Options
const Options = {
  expiresIn: EnvVars.Jwt.Exp,
};


// **** Functions **** //

/**
 * Get session data from request object (i.e. ISessionUser)
 */
function getSessionData<T>(req: Request): Promise<IError | T | undefined> {
  const { Key } = EnvVars.CookieProps,
    jwt = req.signedCookies[Key];
  if(!jwt) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, JWT_VALIDATION_ERROR);
  }
  return _decode(jwt);
}

/**
 * Add a JWT to the response 
 */
async function addSessionData(
  res: Response,
  data: string | object,
): Promise<Response> {
  if (!res || !data) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, INVALID_REQUEST_ERROR);
  }
  // Setup JWT
  const jwt = await _sign(data),
    { Key, Options } = EnvVars.CookieProps;
  // Return
  return res.cookie(Key, jwt, Options);
}

/**
 * Remove cookie
 */
function clearCookie(res: Response): Response {
  const { Key, Options } = EnvVars.CookieProps;
  return res.clearCookie(Key, Options);
}


// **** Helper Functions **** //

/**
 * Encrypt data and return jwt.
 */
function _sign(data: string | object | Buffer): Promise<string> {
  return new Promise((res, rej) => {
    jsonwebtoken.sign(data, EnvVars.Jwt.Secret, Options, (err, token) => {
      return err ? rej(err) : res(token || '');
    });
  });
}

/**
 * Decrypt JWT and extract client data.
 */
function _decode<T>(jwt: string): Promise<IError | undefined | T> {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwt, EnvVars.Jwt.Secret, (err, decoded) => {
      return err ? rej(JWT_VALIDATION_ERROR) : res(decoded as T);
    });
  });
}


// **** Export default **** //

export default {
  addSessionData,
  getSessionData,
  clearCookie,
} as const;
