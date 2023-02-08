/**
 *  Get all accounts
 */
import {IReq, IRes} from "@src/constants/AssignmentInterfaces";
import {IAccount} from "@src/models/Account";
import AccountRepository from "@src/repository/AccountRepository";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {ACCOUNT_NOT_FOUND_ERROR, RouteError} from "@src/helper/Error";
import {NextFunction} from "express";
import {IAccountResponse} from "@src/schemaobjects/response/IAccountResponse";

async function getAll(request: IReq, response: IRes, next: NextFunction) : Promise<IRes> {
    const accounts: IAccount[] = await AccountRepository.getAll();
    let responseBody: IListResponse = {
        totalRecords: accounts.length,
        data: accounts
    };
    return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function getOne(request: IReq, response: IRes, next: NextFunction) : Promise<IRes | void> {
    const { productId } = request.params;
    const account: IAccount | null = await AccountRepository.getOne(productId);
    if(!account) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, ACCOUNT_NOT_FOUND_ERROR);
    }
    return response.status(HttpStatusCodes.OK).json(account as IAccountResponse);
}

export default {
    getAll: getAll,
    getOne: getOne
}