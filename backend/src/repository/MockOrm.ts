

import jsonfile from 'jsonfile';

import { User } from '@src/models/User';
import { Account } from '@src/models/Account';
import { Order } from '@src/models/Order';
import { Product } from '@src/models/Product';
import { Transaction } from '@src/models/Transaction';
import { Discount } from '@src/models/Discount';

// **** Variables **** //

const DB_FILE_NAME = 'database.json';


// **** Types **** //

export interface Db { 
  users: User[];
  accounts: Account[];
  orders: Order[];
  products: Product[];
  transactions: Transaction[];
  discounts: Discount[];
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
