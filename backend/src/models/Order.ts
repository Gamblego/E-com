import { TAll } from 'jet-validator';
import { IAccount } from './Account';
import { IProduct } from './Product';
import { IDiscount } from './Discount';
import { IUser } from './User';
import { OrderStatus } from '@src/constants/AssignmentEnums';

// **** Types **** //

export interface IOrder {
  orderId: string;
  createdBy: IAccount;
	dateCreated: Date;
	orderStatus: OrderStatus;
	orderItems: Array<IProduct>;
	totalAmount: number;
	netAmount: number;
	deliverTo?: IUser;
	appliedDiscount?: IDiscount
}


// **** Functions **** //

/**
 * Get a new Order object.
 */
function new_
(
	createdBy: IAccount, orderStatus?: OrderStatus, orderItems?: Array<IProduct>, 
	totalAmount?: number, netAmount?: number
): IOrder {
  return {
    orderId: '',
    createdBy: createdBy,
		dateCreated: new Date(),
		orderStatus: (orderStatus ?? OrderStatus.PENDING),
		orderItems: (orderItems ?? new Array()),
		totalAmount: (totalAmount ?? 0.0),
		netAmount: (netAmount ?? 0.0)
  };
}

/**
 * Copy an Order object.
 */
function copy
(
  order: IOrder
): IOrder {
  return {
    orderId: order.orderId,
		createdBy: order.createdBy,
		dateCreated: order.dateCreated,
		orderStatus: order.orderStatus,
		orderItems: order.orderItems,
		totalAmount: order.totalAmount,
		netAmount: order.netAmount,
		deliverTo: order.deliverTo,
		appliedDiscount: order.appliedDiscount
  };
}

/**
 * See if an object is an instance of IOrder.
 */
function instanceOf
(arg: TAll): boolean {
  return (
    !!arg && typeof arg === 'object' && 'orderId' in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  copy,
  instanceOf,
} as const;
