import { IProduct } from '@src/models/Product';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one Product.
 */
async function getOne(productId: string): Promise<IProduct | null> {
  const db = await orm.openDb();
  for (const product of db.products) {
    if (product.productId === productId) {
      return product;
    }
  }
  return null;
}

/**
 * See if a Product with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const product of db.products) {
    if (product.productId === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all products.
 */
async function getAll(): Promise<Array<IProduct>> {
  const db = await orm.openDb();
  return db.products;
}

/**
 * Add one Product.
 */
async function add(Product: IProduct): Promise<void> {
  const db = await orm.openDb();
  db.products.push(Product);
  return orm.saveDb(db);
}

/**
 * Update a Product.
 */
async function update(Product: IProduct): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.products.length; i++) {
    if (db.products[i].productId === Product.productId) {
      db.products[i] = Product;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one Product.
 */
async function delete_(id: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.products.length; i++) {
    if (db.products[i].productId === id) {
      db.products.splice(i, 1);
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
