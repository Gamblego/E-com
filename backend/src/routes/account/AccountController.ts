/**
 *  Get all accounts
 */
import {IReq, IRes} from "@src/constants/AssignmentInterfaces";
import {ISessionAccount} from "@src/models/Account";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import httpStatusCodes from "@src/constants/HttpStatusCodes";
import logger from "jet-logger";
import AccountService from "@src/services/AccountService";
import {TAccountRequest, TAccountResponse, TAccountSearchRequest} from "@src/schemaobjects/types";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {Privilege} from "@src/constants/AssignmentEnums";
import SessionUtil from "@src/util/SessionUtil";
import {PromiseWrapper} from "@src/util/AssignmentUtil";
import {RouteError, USER_UNAUTHORIZED_ERROR} from "@src/helper/Error";

async function getAll
(request: IReq<TAccountSearchRequest>, response: IRes) : Promise<IRes> {
    const startTime: number = Date.now();
    const accountSearchRequest: TAccountSearchRequest = request.body;
    const webToken: ISessionAccount = response.locals.sessionUser!;
    if(webToken.privilege == Privilege.Client) {
        throw new RouteError(httpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
    }
    const responseBody: IListResponse<TAccountResponse> =
        await PromiseWrapper(AccountService.getAllAccountsMatchingFilter(accountSearchRequest));
    logger.info(`time taken to complete AccountRouter.GetAll - ${Date.now() - startTime} ms`)
    return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function getOne
(request: IReq, response: IRes) : Promise<IRes> {
    const startTime: number = Date.now();
    const { accountId } = request.params;
    const webToken: ISessionAccount = response.locals.sessionUser!;
    if(webToken.privilege === Privilege.Admin || webToken.accountId === accountId) {
        throw new RouteError(httpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
    }
    const account: TAccountResponse = await PromiseWrapper(AccountService.getAccount(accountId));
    logger.info(`time taken to complete AccountRouter.GetOne - ${Date.now() - startTime} ms`);
    return response.status(HttpStatusCodes.OK).json(account);
}

async function createOne(request: IReq<TAccountRequest>, response: IRes) : Promise<IRes> {
    const startTime: number = Date.now();
    const accountSaveRequest: TAccountRequest = request.body;
    const webToken: ISessionAccount = response.locals.sessionUser!;
    if(webToken.privilege !== Privilege.Admin && webToken.accountId !== '') {
        throw new RouteError(httpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
    }
    const responseBody: ISaveResponse = await PromiseWrapper(AccountService.createAccount(accountSaveRequest));
    const sessionDetails: ISessionAccount = {
        accountId: responseBody.id,
        username: accountSaveRequest.username,
        privilege: Privilege.Client
    }
    await SessionUtil.addSessionData(response, sessionDetails);
    logger.info(`time taken to complete AccountRouter.CreateOne - ${Date.now() - startTime} ms`);
    return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function deleteOne
(request: IReq, response: IRes) : Promise<IRes> {
    const startTime: number = Date.now();
    const { accountId } = request.params;
    const webToken: ISessionAccount = response.locals.sessionUser!;
    if(webToken.privilege !== Privilege.Admin && webToken.accountId !== '') {
        throw new RouteError(httpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
    }
    const accountDeleteResponse: ISaveResponse = await PromiseWrapper(AccountService.deleteAccount(accountId));
    SessionUtil.clearCookie(response);
    logger.info(`time taken to complete AccountRouter.CreateOne - ${Date.now() - startTime} ms`);
    return response.status(HttpStatusCodes.OK).json(accountDeleteResponse);
}

export default {
    getAll: getAll,
    getOne: getOne,
    createOne: createOne,
    deleteOne: deleteOne
}