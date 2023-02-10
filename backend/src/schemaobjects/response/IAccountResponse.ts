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
 *      savedUsers:
 *        type: array
 *        items: object
 *      orderCount:
 *        type: number
 *      cart:
 *        type: object
 *      discounts:
 *        type: array
 *        items: object
 */

export interface IAccountResponse {
  accountId?: string;
  username?: string;
  accountStatus?: AccountStatus;
  dateCreated?: Date;
  privilege?: Privilege;
  savedUsers?: Array<IUser>;
  orderCount?: number;
  cart?: IOrder;
  discounts?: Array<IDiscount>;
}