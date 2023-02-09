import {IAccount} from "@src/models/Account";

export type TAccountRequestKeys = "accountId" | "username" | "password" |
    "accountStatus" | "dateCreated" | "savedUsers";

export type TAccountRequest = Pick<IAccount, TAccountRequestKeys>;

export type TAccountResponseKeys = "accountId" | "username" |
    "accountStatus" | "dateCreated" | "savedUsers" | "cart" | "discounts";

export type TAccountResponse = Pick<IAccount, TAccountResponseKeys>;