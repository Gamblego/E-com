import {TUserRequest} from "@src/schemaobjects/request/TUserRequest"
import {IUser} from "@src/models/User";
import {TUserCreateRequest} from "@src/schemaobjects/request/TUserCreateRequest";

/**
 * @swagger
 * components:
 *  schemas:
 *    UserCreateRequest:
 *    type: object
 *    properties:
 *      accountId:
 *        type: string
 *        required: false
 *      firstName:
 *        type: string
 *        required: true
 *      lastName:
 *        type: string
 *        required: true
 *      example:
 *        accountId: ACCOUNT00000
 *        firstName: John
 *        lastName: Doe
 */

/**
 * @type TUserUpdateRequest
 * @property {string} accountId accountId of the account for which this request is being made
 * @property {string} userId userId of the user to be updated
 * @property {string} firstName first name of the user to be updated
 * @property {string} lastName last name of the user to be updated
 * @sine 0.1.0
 * @see TUserRequest
 */
export type TUserUpdateRequest = TUserCreateRequest & Pick<IUser, "userId">;