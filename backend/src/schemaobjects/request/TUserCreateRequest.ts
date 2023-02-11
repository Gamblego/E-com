import {TUserRequest} from "@src/schemaobjects/request/TUserRequest"

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
 * @type TUserCreateRequest
 * @property {string} accountId accountId of the account for which this request is being made
 * @property {string} firstName first name of the user to be created
 * @property {string} lastName last name of the user to be created
 * @sine 0.1.0
 * @see TUserRequest
 */
export type TUserCreateRequest = TUserRequest & { accountId?: string };