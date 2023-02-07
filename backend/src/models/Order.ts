import { TAll } from 'jet-validator';
import { Account } from './Account';
import { Product } from './Product';
import { Discount } from './Discount';
import { User } from './User';
// **** Variables **** //

export enum OrderStatus {
	PENDING,
	CHECKED_OUT,
	CONFIRMED,
	COMPLETED
}

// **** Types **** //

export interface Order {
  orderId: string;
  createdBy: Account;
	dateCreated: Date;
	orderStatus: OrderStatus;
	orderItems: Array<Product>;
	totalAmount: number;
	netAmount: number;
	deliverTo?: User;
	appliedDiscount?: Discount
}


// **** Functions **** //

/**
 * Get a new Order object.
 */
function new_
(
	createdBy: Account, orderStatus?: OrderStatus, orderItems?: Array<Product>, 
	totalAmount?: number, netAmount?: number
): Order {
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
  order: Order
): Order {
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
 * See if an object is an instance of Order.
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
