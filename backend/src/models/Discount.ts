import { TAll } from 'jet-validator';
import { Account } from './Account';


// **** Variables **** //

export enum DiscountStatus {
  ACTIVE,
	APPLIED,
	EXPIRED
}

// **** Types **** //

export interface Discount {
  discountId: string,
	dateCreated: Date,
	discountPercentage: number,
	discountStatus: DiscountStatus,
	createdTo: Account
}

// **** Functions **** //

/**
 * Get a new Discount object.
 */
function new_
(
	createdTo: Account, discountPercentage?: number
): Discount {
  return {
		discountId: '',
		dateCreated: new Date(),
		discountPercentage: (discountPercentage ?? 10.0),
		discountStatus: DiscountStatus.ACTIVE,
		createdTo: createdTo
  };
}

/**
 * Copy an Discount object.
 */
function copy
(
  discount: Discount
): Discount {
  return {
    discountId: discount.discountId,
		dateCreated: discount.dateCreated,
		createdTo: discount.createdTo,
		discountPercentage: discount.discountPercentage,
		discountStatus: discount.discountStatus
  };
}

/**
 * See if an object is an instance of Discount.
 */
function instanceOf
(arg: TAll): boolean {
  return (
    !!arg && typeof arg === 'object' && 'discountId' in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  copy,
  instanceOf,
} as const;
