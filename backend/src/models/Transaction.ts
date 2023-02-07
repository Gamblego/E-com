import { TAll } from 'jet-validator';
import { Account } from './Account';
import { Order } from './Order';

// **** Variables **** //

export enum TransactionStatus {
  INITIATED,
	DONE,
	FAILED,
	CANCELLED
}

// **** Types **** //

export interface Transaction {
  transactionId: string;
  order: Order;
  dateCreated: Date;
	amountPayable: number;
	initiatedBy: Account;
	status: TransactionStatus
}

// **** Functions **** //

/**
 * Get a new Transaction object.
 */
function new_
(
	order: Order, initiatedBy: Account, amountPayable?: number
): Transaction {
  return {
    transactionId: '',
    order: order,
		dateCreated: new Date(),
		amountPayable: (amountPayable ?? 0.0),
		initiatedBy: initiatedBy,
    status: TransactionStatus.INITIATED
  };
}

/**
 * Copy an Transaction object.
 */
function copy
(
  transaction: Transaction
): Transaction {
  return {
    transactionId: transaction.transactionId,
    order: transaction.order,
    dateCreated: transaction.dateCreated,
		amountPayable: transaction.amountPayable,
		initiatedBy: transaction.initiatedBy,
		status: transaction.status
  };
}

/**
 * See if an object is an instance of Transaction.
 */
function instanceOf
(arg: TAll): boolean {
  return (
    !!arg && typeof arg === 'object' && 'transactionId' in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  copy,
  instanceOf,
} as const;
