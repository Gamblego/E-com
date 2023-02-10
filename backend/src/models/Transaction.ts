import { TransactionStatus } from '@src/constants/AssignmentEnums';
import { TAll } from 'jet-validator';
import { IAccount } from './Account';
import { IOrder } from './Order';

// **** Types **** //

export interface ITransaction {
  transactionId: string;
  order: IOrder;
  dateCreated: Date;
	amountPayable: number;
	initiatedBy: IAccount;
	status: TransactionStatus
}

// **** Functions **** //

/**
 * Get a new Transaction object.
 */
function new_
(
	order: IOrder, initiatedBy: IAccount, amountPayable?: number
): ITransaction {
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
  transaction: ITransaction
): ITransaction {
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
