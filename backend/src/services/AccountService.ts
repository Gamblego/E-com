/**
 * get all accounts
 */
import {IAccountSearchRequest} from "@src/schemaobjects/request/IAccountSearchRequest";
import {IAccount} from "@src/models/Account";
import AccountRepository from "@src/repository/AccountRepository";
import {RouteError, USER_NOT_FOUND_ERROR} from "@src/helper/Error";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

async function getAllAccountsMatchingFilter(account: IAccountSearchRequest): Promise<IAccount[]> {
  return await AccountRepository.getAll();
}

async function getAccount(accountId: string): Promise<IAccount | null> {
  const account: IAccount | null = await AccountRepository.getOne(accountId);
  if(!account) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }
  return account;
}