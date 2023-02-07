import { TAll } from 'jet-validator';
import { Account } from './Account';

// **** Types **** //

export interface Product {
  productId: string;
  productName: string,
  description: string,
  price: number,
  stockCount: number,
  seller?: Account
}

// **** Functions **** //

/**
 * Get a new Product object.
 */
function new_
(
	productName?: string, description?: string, 
    price?: number, stockCount?: number
): Product {
  return {
    productId: '',
    productName: (productName ?? ''),
    description: (description ?? ''),
	price: (price ?? 0.0),
    stockCount: (stockCount ?? 0.0)
  };
}

/**
 * Copy an Product object.
 */
function copy
(
  product: Product
): Product {
  return {
    productId: product.productId,
    productName: product.productName,
    description: product.description,
    price: product.price,
    stockCount: product.stockCount,
    seller: product.seller
  };
}

/**
 * See if an object is an instance of Product.
 */
function instanceOf
(arg: TAll): boolean {
  return (
    !!arg && typeof arg === 'object' && 'productId' in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  copy,
  instanceOf,
} as const;
