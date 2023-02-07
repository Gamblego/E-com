import { Order } from '@src/models/Order';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one Order.
 */
async function getOne(orderId: string): Promise<Order | null> {
  const db = await orm.openDb();
  for (const order of db.orders) {
    if (order.orderId === orderId) {
      return order;
    }
  }
  return null;
}

/**
 * See if a Order with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const db = await orm.openDb();
  for (const order of db.orders) {
    if (order.orderId === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all orders.
 */
async function getAll(): Promise<Array<Order>> {
  const db = await orm.openDb();
  return db.orders;
}

/**
 * Add one Order.
 */
async function add(Order: Order): Promise<void> {
  const db = await orm.openDb();
  db.orders.push(Order);
  return orm.saveDb(db);
}

/**
 * Update a Order.
 */
async function update(Order: Order): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.orders.length; i++) {
    if (db.orders[i].orderId === Order.orderId) {
      db.orders[i] = Order;
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one Order.
 */
async function delete_(id: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.orders.length; i++) {
    if (db.orders[i].orderId === id) {
      db.orders.splice(i, 1);
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
