import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserService from '@src/services/UserService';
import {IUser} from '@src/models/User';
import {IReq, IRes} from '@src/constants/AssignmentInterfaces';
import {TUserRequest} from "@src/schemaobjects/request/TUserRequest";
import {PromiseWrapper} from "@src/util/AssignmentUtil";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import logger from "jet-logger";
import account, {ISessionAccount} from "@src/models/Account";
import {Privilege} from "@src/constants/AssignmentEnums";
import {TUserCreateRequest} from "@src/schemaobjects/request/TUserCreateRequest";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {TUserUpdateRequest} from "@src/schemaobjects/request/TUserUpdateRequest";


// **** Functions **** //

/**
 * Get all users matching filter.
 */
async function getAll(request: IReq<TUserRequest>, response: IRes): Promise<IRes> {
  const startTime: number = Date.now();
  const userRequest: TUserCreateRequest = request.body;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    userRequest.accountId = webToken.accountId;
  }
  const users: IListResponse<IUser> = await PromiseWrapper(UserService.getAll(userRequest));
  logger.info(`time taken in UserRouter.GetAll: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(users);
}

/**
 * Add one user.
 */
async function add(request: IReq<TUserCreateRequest>, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const userCreateRequest: TUserCreateRequest = request.body;
  const { accountId, ...webToken } = response.locals.sessionUser!;
  userCreateRequest.accountId = accountId;
  const responseBody: ISaveResponse = await PromiseWrapper(UserService.addOne(userCreateRequest));
  logger.info(`time taken in UserRouter.Add: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.CREATED).end(responseBody);
}

/**
 * Update one user.
 */
async function update(request: IReq<TUserUpdateRequest>, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const userRequest: TUserUpdateRequest = request.body;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    userRequest.accountId = webToken.accountId;
  }
  const responseBody = await PromiseWrapper(UserService.updateOne(userRequest));
  logger.info(`time taken in UserRouter.Add: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).end(responseBody);
}

/**
 * Delete one user.
 */
async function delete_(request: IReq<IUser>, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const { userId } = request.params;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  const accountId: string | undefined = webToken.privilege === Privilege.Admin ? undefined : webToken.accountId;
  const responseBody = await PromiseWrapper(UserService.delete(userId, accountId));
  logger.info(`time taken in UserRouter.Add: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).end(responseBody);
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
