import {IAccount} from "@src/models/Account";
import {IProduct} from "@src/models/Product";

export type TAccountRequestKeys = "accountId" | "username" | "password" |
    "accountStatus" | "dateCreated" | "savedUsers";

export type TAccountRequest = Pick<IAccount, TAccountRequestKeys>;

export type TAccountResponseKeys = "accountId" | "username" |
    "accountStatus" | "dateCreated" | "savedUsers" | "cart" | "discounts";

export type TAccountResponse = Pick<IAccount, TAccountResponseKeys>;

/**
 * @swagger
 * components:
 *  schemas:
 *    ProductSearchRequest:
 *      type: object
 *      properties:
 *        productId:
 *          type: string
 *        productName:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: integer
 *        seller:
 *          type: string
 *      example:
 *        productId: PRODUCT1
 *        productName: PRODUCT
 *        description: best shampoo for hair fall and dryness
 *        price: 200
 *        seller: Amazon
 */
export type TProductSearchRequest = IProduct;