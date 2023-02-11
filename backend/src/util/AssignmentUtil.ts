/**
 * Miscellaneous shared functions go here.
 */


import logger from "jet-logger";
import {ISessionAccount} from "@src/models/Account";
import {Privilege} from "@src/constants/AssignmentEnums";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {RouteError, USER_UNAUTHORIZED_ERROR} from "@src/helper/Error";

/**
 * Get a random number between 1 and 1,000,000,000,000
 */
export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Wait for a certain number of milliseconds.
 */
export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}


export async function PromiseWrapper<T> (
    promise: Promise<T>
):  Promise<T> {
  return await promise.catch(err => {
    logger.err(`Error: ${JSON.stringify(err)}`);
    throw err;
  });
}

export function CreateId(model: string) {
  return model.toUpperCase() + Math.floor(Math.random() * 1e5).toString();
}

export function checkParameters<T extends object>(objectToCheck: T, props: (keyof T)[]): boolean {
  for(const key in props) {
    if(objectToCheck[props[key]] == null) return false;
  }
  return true;
}