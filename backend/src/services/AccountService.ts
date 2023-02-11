/**
 * get all accounts
 */
import {IAccount, ISessionAccount} from "@src/models/Account";
import AccountRepository from "@src/repository/AccountRepository";
import {
  ID_IS_MANDATORY_ERROR,
  INVALID_REQUEST_ERROR,
  RouteError,
  USER_NOT_FOUND_ERROR,
} from "@src/helper/Error";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import {TAccountRequest, TAccountResponse, TAccountSearchRequest} from "@src/schemaobjects/types";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {AccountStatus, Privilege} from "@src/constants/AssignmentEnums";
import {checkParameters, CreateId, PromiseWrapper} from "@src/util/AssignmentUtil";
import UserService from "@src/services/UserService";

/**
 * get all accounts matching the given filter.
 *
 * @since 0.1.0
 * @param {IAccountSearchRequest} account the filter object to query.
 * @param {ISessionAccount} webToken json web token containing the session details.
 * @returns Promise which contains the list of accounts that match the given filter.
 * @throws DB_ERROR if database access throws error
 * @throws USER_UNAUTHORIZED_ERROR if user is a client
 * @see TAccountSearchRequest
 * @see IListResponse
 * @see TAccountResponse
 */
async function getAllAccountsMatchingFilter
(account: TAccountSearchRequest): Promise<IListResponse<TAccountResponse>> {
  const accounts: IAccount[] = await AccountRepository.getAll(account);
  const accountsWithPasswordRemoved: TAccountResponse[]
      = accounts.map(account => {
        const { password, ...accountWithoutPassword } = account;
        return accountWithoutPassword;
  });

  return {
    totalRecords: accountsWithPasswordRemoved.length,
    data: accountsWithPasswordRemoved
  };
}

/**
 * fetch account whose accountId is provided.
 *
 * @since 0.1.0
 * @param {string} accountId the accountId for which to fetch the account
 * @param {ISessionAccount} webToken json web token containing the session details
 * @returns  Promise whose value List of accounts that match the given filter.
 * @throws USER_NOT_FOUND_ERROR if the account with given I'd is not found
 * @throws USER_UNAUTHORIZED_ERROR if the logged-in user is client
 * whose accountId is different from the accountId provided
 * @see TAccountResponse
 */
async function getAccount(accountId: string): Promise<TAccountResponse> {
  const account: IAccount | null = await PromiseWrapper(AccountRepository.getOne(accountId));
  if(!account) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERROR);
  }
  const { password, ...accountResponse } = account;
  return accountResponse;
}

/**
 * creates a new account containing the given details.
 *
 * @since 0.1.0
 * @param {TAccountRequest} accountRequest  the request object containing account data.
 * @returns Promise containing the account Id of the created account.
 * @throws INVALID_REQUEST_ERROR if accountRequest is null or invalid.
 * @see TAccountRequest
 * @see ISaveResponse
 */
async function createAccount(accountRequest: TAccountRequest): Promise<ISaveResponse> {
  if(!checkParameters(accountRequest, ["username", "password", "firstName", "lastName"])) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  const newAccountId = CreateId("account");

  const userSaveResponse: ISaveResponse =
      await PromiseWrapper(UserService.addOne({
        accountId: newAccountId,
        firstName: accountRequest.firstName,
        lastName: accountRequest.lastName
      }));

  const account: IAccount = {
    accountId:  newAccountId,
    username: accountRequest.username,
    password: accountRequest.password,
    privilege: Privilege.Client,
    accountStatus: AccountStatus.ACTIVE,
    dateCreated: new Date(),
    savedUsers: [userSaveResponse.id]
  }

  await PromiseWrapper(AccountRepository.add(account));
  return {
    id: account.accountId
  };
}

/** delete the account whose accountId matched the provided value.
 * @param {string} accountId the accountId of the account to be deleted.
 * @returns Promise containing the accountId of the deleted Account.
 * @throws ID_IS_MANDATORY_ERROR if accountId is null
 * @throws USER_NOT_FOUND_ERROR if no account exits with given accountId.
 * @since 0.1.0
 * @see ISaveResponse
 */
async function deleteAccount(accountId: string): Promise<ISaveResponse> {
  if(!accountId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  const accountFound: boolean = await PromiseWrapper(AccountRepository.delete(accountId));

  if(!accountFound) {
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