import { TAll } from 'jet-validator';

// **** Types **** //

export interface User {
  userId: string
  isOwner?: boolean
  firstName?: string,
  lastName?: string,
  email?: string,
  countryCode?: number,
  phoneNumber?: number,
  address?: string,
  city?: string,
  state?: string,
  country?: string,
  pinCode?: number
}

// **** Functions **** //

/**
 * Get a new User object.
 */
function new_(
  isOwner?: boolean,
  firstName?: string,
  lastName?: string,
  email?: string,
): User {
  return {
    userId: '',
    isOwner: isOwner,
    firstName: (firstName ?? ''),
    lastName: (lastName ?? ''),
    email: (email ?? '')
  };
}

/**
 * Copy a user object.
 */
function copy(user: User): User {
  return {
    userId: user.userId,
    isOwner: user.isOwner,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    countryCode: user.countryCode,
    phoneNumber: user.phoneNumber,
    address: user.address,
    city: user.city,
    state: user.state,
    country: user.country,
    pinCode: user.pinCode
  };
}

/**
 * See if an object is an instance of User.
 */
function instanceOf(arg: TAll): boolean {
  return (
    !!arg && typeof arg === 'object' && 'userId' in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  copy,
  instanceOf,
} as const;
