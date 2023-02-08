import {AccountStatus, Privilege} from "@src/constants/AssignmentEnums";
import {IUser} from "@src/models/User";
import {IOrder} from "@src/models/Order";
import {IDiscount} from "@src/models/Discount";

/**
 * @swagger
 * components:
 *  schemas:
 *   AccountSearchRequest:
 *    type: object
 *    properties:
 *      accountId:
 *        type: string
 *      username:
 *        type: string
 *      password:
 *        type: string
 *      accountStatus:
 *        type: string
 *      dateCreated:
 *        type: string
 *      privilege:
 *        type: string
 *      orderCount:
 *        type: number
 */

export interface IAccountSearchRequest {
  accountId?: string;
  username?: string;
  password?: string;
  accountStatus?: AccountStatus;
  dateCreated?: Date;
  privilege?: Privilege;
  orderCount?: number;
}