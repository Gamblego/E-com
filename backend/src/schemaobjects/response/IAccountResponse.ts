import {AccountStatus, Privilege} from "@src/constants/AssignmentEnums";
import {IUser} from "@src/models/User";
import {IOrder} from "@src/models/Order";
import {IDiscount} from "@src/models/Discount";

export interface IAccountResponse {
  accountId?: string;
  username?: string;
  password?: string;
  accountStatus?: AccountStatus;
  dateCreated?: Date;
  privilege?: Privilege;
  savedUsers?: Array<IUser>;
  orderCount?: number;
  cart?: IOrder;
  discounts?: Array<IDiscount>;
}