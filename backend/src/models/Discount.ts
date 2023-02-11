import { DiscountStatus } from '@src/constants/AssignmentEnums';
import { TAll } from 'jet-validator';
import { IAccount } from './Account';

// **** Types **** //

export interface IDiscount {
  discountId?: string,
	dateCreated?: Date,
	discountPercentage?: number,
	discountStatus?: DiscountStatus,
	createdTo?: string // account id of the account for which discount was created
}

// **** Functions **** //

/**
 * Get a new Discount object.
 */
function new_
(
	createdTo: string, discountPercentage?: number
): IDiscount {
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
  discount: IDiscount
): IDiscount {
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
