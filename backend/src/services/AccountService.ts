/**
 * get all accounts
 */
import {IAccountSearchRequest} from "@src/schemaobjects/request/IAccountSearchRequest";
import {IAccount} from "@src/models/Account";
import AccountRepository from "@src/repository/AccountRepository";
import {
  DB_ERROR,
  ID_IS_MANDATORY_ERROR,
  INVALID_REQUEST_ERROR,
  RouteError,
  USER_NOT_FOUND_ERROR
} from "@src/helper/Error";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import {TAccountRequest, TAccountResponse} from "@src/schemaobjects/types";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {Privilege} from "@src/constants/AssignmentEnums";
import {PromiseWrapper} from "@src/util/AssignmentUtil";

async function getAllAccountsMatchingFilter(account: IAccountSearchRequest): Promise<IListResponse<IAccount>> {
  const accounts: IAccount[] = await AccountRepository.getAll();
  return {
    totalRecords: accounts.length,
    data: accounts
  };
}

async function getAccount(accountId: string): Promise<TAccountResponse> {

  const account: IAccount | null | void = await PromiseWrapper(AccountRepository.getOne(accountId), DB_ERROR);
  if(!account) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }
  return {
    accountId: account.accountId,
    username: account.username,
    accountStatus: account.accountStatus,
    dateCreated: account.dateCreated
  };
}

async function createAccount(accountRequest: TAccountRequest): Promise<ISaveResponse> {
  if(!accountRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  const account: IAccount = {
    accountId: accountRequest.accountId,
    username: accountRequest.username,
    password: accountRequest.password,
    privilege: Privilege.Client,
    accountStatus: accountRequest.accountStatus,
    dateCreated: accountRequest.dateCreated,
    savedUsers: accountRequest.savedUsers
  }

  await PromiseWrapper(AccountRepository.add(account), DB_ERROR);

  return {
    id: account.accountId
  };
}

async function deleteAccount(accountId: string): Promise<ISaveResponse> {
  if(!accountId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  const accountFound: boolean | void = await PromiseWrapper(AccountRepository.delete(accountId), DB_ERROR);

  if(typeof accountFound === 'boolean' && !accountFound) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }
  return {
    id: accountId
  };
}

export default {
  getAllAccountsMatchingFilter,
  getAccount,
  createAccount,
  deleteAccount
};