import UserRepository from '@src/repository/UserRepository';
import user, { IUser } from '@src/models/User';
import {RouteError, USER_NOT_FOUND_ERROR} from '@src/helper/Error';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {TUserCreateRequest} from "@src/schemaobjects/request/TUserCreateRequest";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import {CreateId, PromiseWrapper} from "@src/util/AssignmentUtil";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {TUserUpdateRequest} from "@src/schemaobjects/request/TUserUpdateRequest";
import userRepository from "@src/repository/UserRepository";
import account from "@src/models/Account";

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(userRequest: TUserCreateRequest): Promise<IListResponse<IUser>> {
  const filter: IUser = {
    firstName: userRequest.firstName,
    lastName: userRequest.lastName
  };

  if('accountId' in userRequest) {
    filter.createdBy = userRequest.accountId;
  }

  const users: IUser[] = await PromiseWrapper(UserRepository.getAll(filter));
  return {
    totalRecords: users.length,
    data: users
  }
}

/**
 * Add one user.
 */
async function addOne(userRequest: TUserCreateRequest): Promise<ISaveResponse> {
  const user: IUser = {
    userId: CreateId("user"),
    createdBy: userRequest.accountId,
    firstName: userRequest.firstName,
    lastName: userRequest.lastName
  };
  await PromiseWrapper(UserRepository.add(user));
  return {
    id: user.userId!
  };
}

/**
 * Update one user.
 */
async function updateOne(userRequest: TUserUpdateRequest): Promise<ISaveResponse> {
  const user: IUser | null = await PromiseWrapper(userRepository.getOne(userRequest.userId!));
  if (user == null || user.createdBy! !== userRequest.accountId) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERROR
    );
  }

  const updateUser: IUser = {
    userId: userRequest.userId,
    firstName: userRequest.firstName,
    lastName: userRequest.lastName
  }

  await PromiseWrapper(UserRepository.update(updateUser));
  // Return user
  return {
    id: userRequest.userId!
  };
}

/**
 * Delete a user by their id.
 */
async function _delete(userId: string, accountId?: string): Promise<ISaveResponse> {
  const user: IUser | null = await PromiseWrapper(userRepository.getOne(userId));
  if (user == null || (typeof accountId !== undefined && user.createdBy! !== accountId)) {
    throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        USER_NOT_FOUND_ERROR
    );
  }
  await PromiseWrapper(UserRepository.delete(userId));
  // delete user
  return {
    id: userId
  };
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
