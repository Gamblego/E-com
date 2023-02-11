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

export const INTERNAL_PROCESSING_ERROR: IError = {
  code: "INTERNAL_PROCESSING_ERROR",
  message: "Some error occurred. Please try again later"
};

export const DB_ERROR: IError = {
  code: "DB_ERROR",
  message: "Some error occurred. Please try again later"
};

export const ID_IS_MANDATORY_ERROR: IError = {
  code: "ID_IS_MANDATORY_ERROR",
  message: "Id is missing in request"
}

export const PRODUCT_NOT_FOUND_ERROR: IError = {
  code: "PRODUCT_NOT_FOUND_ERROR",
  message: "The requested product could not be fetched. Please try again later"
}

export const USER_EXISTS_ERROR: IError = {
  code: "USER_EXISTS_ERROR",
  message: "A user with the same username already exists!"
}

export const NO_CURRENT_ORDER_ERROR: IError = {
  code: "NO_CURRENT_ORDER_ERROR",
  message: "User does not have any product in their cart"
}

export const DISCOUNT_ALREADY_PRESENT_ERROR: IError = {
  code: "DISCOUNT_ALREADY_PRESENT_ERROR",
  message: "Discount has already been applied to the order"
}

export const USER_HAS_DISCOUNT_ERROR: IError = {
  code: "USER_HAS_DISCOUNT_ERROR",
  message: "User already has an active discount"
}

export const NTH_ORDER_ERROR: IError = {
  code: "NTH_ORDER_ERROR",
  message: "Discount cannot be applied on this order"
}

export const ORDER_NOT_FOUND_ERROR: IError = {
  code: "ORDER_NOT_FOUND_ERROR",
  message: "The request order does not exist"
}