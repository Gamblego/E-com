export enum NodeEnvs {
	Dev = 'development',
	Test = 'test',
	Production = 'production'
}

export enum Privilege {
	Client,
	Admin,
	Seller
}

export enum AccountStatus {
	ACTIVE,
	CLOSED,
	BANNED
}

export enum DiscountStatus {
  ACTIVE,
	APPLIED,
	EXPIRED
}

export enum OrderStatus {
	PENDING,
	CHECKED_OUT,
	CONFIRMED,
	COMPLETED
}

export enum TransactionStatus {
  INITIATED,
	DONE,
	FAILED,
	CANCELLED
}