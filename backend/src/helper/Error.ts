/**
 * Miscellaneous shared classes go here.
 */

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {IError} from "@src/schemaobjects/IError";

// ** RouteError Class **** //
/**
 * Error Object
 * @param status - the HTTP status code associated with the error object
 * @param error - the error code and message associated with the error object
 * @constructor - default constructor
 */
export class RouteError extends Error {
  status: HttpStatusCodes;
  errorObject: IError;

  /**
   * constructor for the error object
   * @param status - HTTP status code associated with the error object
   * @param errorObject - error code and message associated with the error object
   */
  constructor(status: HttpStatusCodes, errorObject: IError) {
    super(errorObject.message);
    this.status = status;
    this.errorObject = errorObject;
  }
}

// **** Error constants **** //
export const INVALID_REQUEST_ERROR: IError = {
  code: "INVALID_REQUEST_ERROR",
  message: "Invalid request/params"
};

export const JWT_VALIDATION_ERROR: IError = {
  code: "JWT_VALIDATION_ERROR",
  message: "JSON-web-token validation failed"
};

export const USER_UNAUTHORIZED_ERROR: IError = {
  code: "USER_UNAUTHORIZED_ERROR",
  message: "User not authorized to perform this action",
};

export const ACCOUNT_NOT_FOUND_ERROR: IError = {
  code: "ACCOUNT_NOT_FOUND_ERROR",
  message: "Account with given details does not exist"
}

export const LOGIN_FAILED_ERROR: IError = {
  code: "LOGIN_FAILED_ERROR",
  message: "Login attempt unsuccessful. Please try again"
}

export const USER_NOT_FOUND_ERROR: IError = {
  code: "USER_NOT_FOUND_ERROR",
  message: "User with given credentials does not exist"
}
