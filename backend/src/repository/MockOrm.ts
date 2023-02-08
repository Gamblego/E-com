

import jsonfile from 'jsonfile';

import { IUser } from '@src/models/User';
import { IAccount } from '@src/models/Account';
import { IOrder } from '@src/models/Order';
import { IProduct } from '@src/models/Product';
import { ITransaction } from '@src/models/Transaction';
import { IDiscount } from '@src/models/Discount';

// **** Types **** //

export interface Db { 
  users: IUser[];
  accounts: IAccount[];
  orders: IOrder[];
  products: IProduct[];
  transactions: ITransaction[];
  discounts: IDiscount[];
}


// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<Db> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<Db>;
}

/**
 * Update the file.
 */
function saveDb(db: Db): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}


// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;
