import {IReq, IRes} from "@src/constants/AssignmentInterfaces";
import {ISessionAccount} from "@src/models/Account";
import {Privilege} from "@src/constants/AssignmentEnums";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {RouteError, USER_UNAUTHORIZED_ERROR} from "@src/helper/Error";
import logger from "jet-logger";
import {PromiseWrapper} from "@src/util/AssignmentUtil";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {AdminSummaryResponse} from "@src/schemaobjects/response/AdminSummaryResponse";
import AdminService from "@src/services/AdminService";

async function getSummary(request: IReq, response: IRes): Promise<IRes> {
  const startTime: number = Date.now();
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
  }
  const responseBody: AdminSummaryResponse = await PromiseWrapper(AdminService.getBusinessSummary());
  logger.info(`time taken to complet AdminRouter.GetSummary: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function addDiscountCode(request: IReq, response: IRes): Promise<IRes> {
  const startTime: number = Date.now();
  const { accountId } = request.params;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
  }
  const responseBody: ISaveResponse = await PromiseWrapper(AdminService.addDiscountCode(accountId));
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

export default {
  getSummary,
  addDiscountCode
}