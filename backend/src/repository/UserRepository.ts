import { IUser } from '@src/models/User';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(userId: string): Promise<IUser | null> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.email === userId) {
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
  for (const user of db.users) {
    if (user.userId === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(filter: IUser): Promise<IUser[]> {
  const db = await orm.openDb();
  return db.users.filter(user =>
    (filter.firstName === undefined || filter.firstName === user.firstName) &&
    (filter.lastName === undefined || filter.lastName === user.lastName) &&
    (filter.createdBy === undefined || filter.createdBy === user.createdBy)
  );
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<void> {
  const db = await orm.openDb();
  db.users.push(user);
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].userId === user.userId) {
      db.users[i] = user;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].userId === id) {
      db.users.splice(i, 1);
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
