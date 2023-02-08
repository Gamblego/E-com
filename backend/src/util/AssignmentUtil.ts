/**
 * Miscellaneous shared functions go here.
 */


import {IReq, IRes} from "@src/constants/AssignmentInterfaces";
import {NextFunction} from "express";

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

export function ControllerWrapper (
    controllerFunction: Function
): <T = void>(request: IReq<T>, response: IRes, next: NextFunction) => Promise<IRes | void> {
  return async function<T = void> (request: IReq<T>, response: IRes, next: NextFunction) {
    try {
      return await controllerFunction(request, response, next);
    } catch (err: any) {
      next(err);
    }
  }
}
