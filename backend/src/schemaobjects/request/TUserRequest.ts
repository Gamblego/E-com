/**
 * @swagger
 * components:
 *  schemas;
 *    UserRequest:
 *    type: object
 *    properties:
 *      firstName:
 *        type: string
 *        required: true
 *      lastName:
 *        type: string
 *        required: true
 *    example:
 *      firstName: John
 *      lastName: Doe
 */

import {IUser} from "@src/models/User";

/**
 * @type TUserRequest
 * @property {string} firstName first name of the user
 * @property {string} lastName last name of the user
 * @since 0.1.0
 */
export type TUserRequest = Pick<IUser, "firstName" | "lastName">;