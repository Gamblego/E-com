import { TAll } from 'jet-validator';
import { Order } from './Order';
import { Discount } from './Discount';
import { User } from './User';
import { AccountStatus, Privilege } from '@src/constants/AssignmentEnums';

// **** Types **** //

export interface Account {
  accountId: string;
  username: string;
  password: string;
	accountStatus: AccountStatus;
	dateCreated: Date;
	privilege: Privilege;
	savedUsers?: Array<User>;
	orderCount?: number;
	cart?: Order;
	discounts?: Array<Discount>;
}

export interface SessionAccount {
  accountId: string;
  username: string;
  privilege: Account['privilege'];
}


// **** Functions **** //

/**
 * Get a new Account object.
 */
function new_
(
	username?: string, privilege?: Privilege, 
  password?: string, accountStatus?: AccountStatus
): Account {
  return {
    accountId: '',
    username: (username ?? ''),
    password: (password ?? ''),
		accountStatus: (accountStatus ?? AccountStatus.ACTIVE),
		dateCreated: new Date(),
    privilege: (privilege ?? Privilege.Client)
  };
}

/**
 * Copy an Account object.
 */
function copy
(
  account: Account
): Account {
  return {
    accountId: account.accountId,
    username: account.username,
    privilege: account.privilege,
    password: account.password,
    accountStatus: account.accountStatus,
    dateCreated: account.dateCreated,
    savedUsers: account.savedUsers,
    orderCount: account.orderCount,
    cart: account.cart,
    discounts: account.discounts
  };
}

/**
 * See if an object is an instance of Account.
 */
function instanceOf
(arg: TAll): boolean {
  return (
    !!arg && typeof arg === 'object' && 'accountId' in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  copy,
  instanceOf,
} as const;
