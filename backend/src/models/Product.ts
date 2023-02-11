import { TAll } from 'jet-validator';

// **** Types **** //

export interface IProduct {
  productId: string;
  productName: string,
  description: string,
  price: number,
  stockCount: number,
  seller?: string // accountId of Account that put up the product
}

// **** Functions **** //

/**
 * Get a new Product object.
 */
function new_
(
	productName?: string, description?: string, 
    price?: number, stockCount?: number
): IProduct {
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
  product: IProduct
): IProduct {
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
