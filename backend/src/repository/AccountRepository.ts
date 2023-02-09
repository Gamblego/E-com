import { IAccount } from '@src/models/Account';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(accountId: string): Promise<IAccount | null> {
  const db = await orm.openDb();
  for (const user of db.accounts) {
    if (user.accountId === accountId) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const account of db.accounts) {
    if (account.accountId === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IAccount[]> {
  const db = await orm.openDb();
  return db.accounts;
}

/**
 * Add one user.
 */
async function add(account: IAccount): Promise<void> {
  const db = await orm.openDb();
  db.accounts.push(account);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(account: IAccount): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.accounts.length; i++) {
    if (db.accounts[i].accountId === account.accountId) {
      db.accounts[i] = account;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (let i = 0; i < db.accounts.length; i++) {
    if (db.accounts[i].accountId === id) {
      db.accounts.splice(i, 1);
      await orm.saveDb(db);
      return true;
    }
  }
  return false;
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
