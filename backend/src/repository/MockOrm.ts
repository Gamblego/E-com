

import jsonfile from 'jsonfile';

import { IUser } from '@src/models/User';
import { IAccount } from '@src/models/Account';
import { IOrder } from '@src/models/Order';
import { IProduct } from '@src/models/Product';
import { ITransaction } from '@src/models/Transaction';
import { IDiscount } from '@src/models/Discount';
import AssignmentConstants from "@src/constants/AssignmentConstants";

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
async function openDb(): Promise<Db> {
  const db = await jsonfile.readFile(__dirname + '/' + AssignmentConstants.DB_FILE_NAME) as Db;
  if(!db.accounts) db.accounts = [];
  if(!db.users) db.users = [];
  if(!db.orders) db.orders = [];
  if(!db.products) db.products = [];
  if(!db.transactions) db.transactions = [];
  if(!db.discounts) db.discounts = [];

  return db;
}

/**
 * Update the file.
 */
function saveDb(db: Db): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + AssignmentConstants.DB_FILE_NAME), db);
}


// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;
