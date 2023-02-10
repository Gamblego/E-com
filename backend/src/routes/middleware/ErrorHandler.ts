import {IReq, IRes} from "@src/constants/AssignmentInterfaces";
import {RouteError} from "@src/helper/Error";
import logger from "jet-logger";
import {NextFunction} from "express";

export default async function ErrorHandle(error: RouteError , request: IReq, response: IRes, next: NextFunction) {
  logger.err(`[${error.errorObject?.code}] : ${error.errorObject?.message}`);
  return response
  .status(error.status)
  .json({ errorCode: error.errorObject?.code, errorMessage: error.errorObject?.message});
}