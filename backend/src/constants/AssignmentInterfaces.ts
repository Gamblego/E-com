import * as e from 'express';
import { Query } from 'express-serve-static-core';
import { ISessionAccount } from '@src/models/Account';


// **** Declaration Merging **** //

declare module 'express' {

  export interface Request {
    signedCookies: Record<string, string>;
  }
}

// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: ISessionAccount;
  };
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
	query: T;
	body: U;
}