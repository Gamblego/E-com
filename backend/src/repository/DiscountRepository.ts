import { Discount } from '@src/models/Discount';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one Discount.
 */
async function getOne(discountId: string): Promise<Discount | null> {
  const db = await orm.openDb();
  for (const Discount of db.discounts) {
    if (Discount.discountId === discountId) {
      return Discount;
    }
  }
  return null;
}

/**
 * See if a Discount with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const discount of db.discounts) {
    if (discount.discountId === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all discounts.
 */
async function getAll(): Promise<Array<Discount>> {
  const db = await orm.openDb();
  return db.discounts;
}

/**
 * Add one Discount.
 */
async function add(discount: Discount): Promise<void> {
  const db = await orm.openDb();
  db.discounts.push(discount);
  return orm.saveDb(db);
}

/**
 * Update a Discount.
 */
async function update(discount: Discount): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.discounts.length; i++) {
    if (db.discounts[i].discountId === discount.discountId) {
      db.discounts[i] = discount;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one Discount.
 */
async function delete_(id: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.discounts.length; i++) {
    if (db.discounts[i].discountId === id) {
      db.discounts.splice(i, 1);
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
