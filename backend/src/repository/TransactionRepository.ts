import { ITransaction } from '@src/models/Transaction';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one transaction.
 */
async function getOne(transactionId: string): Promise<ITransaction | null> {
  const db = await orm.openDb();
  for (const transaction of db.transactions) {
    if (transaction.transactionId === transactionId) {
      return transaction;
    }
  }
  return null;
}

/**
 * See if a transaction with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const transaction of db.transactions) {
    if (transaction.transactionId === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all transactions.
 */
async function getAll(): Promise<Array<ITransaction>> {
  const db = await orm.openDb();
  return db.transactions;
}

/**
 * Add one transaction.
 */
async function add(transaction: ITransaction): Promise<void> {
  const db = await orm.openDb();
  db.transactions.push(transaction);
  return orm.saveDb(db);
}

/**
 * Update a transaction.
 */
async function update(transaction: ITransaction): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.transactions.length; i++) {
    if (db.transactions[i].transactionId === transaction.transactionId) {
      db.transactions[i] = transaction;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one transaction.
 */
async function delete_(id: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.transactions.length; i++) {
    if (db.transactions[i].transactionId === id) {
      db.transactions.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
