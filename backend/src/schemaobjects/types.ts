import {IAccount} from "@src/models/Account";
import {IProduct} from "@src/models/Product";

export type TAccountRequestKeys = "username" | "accountStatus" |
    "dateCreated" | "savedUsers";

export type TAccountRequest = Pick<IAccount, TAccountRequestKeys |
    "password">;
export type TAccountResponseKeys = "accountId" | "username" |
    "accountStatus" | "dateCreated" | "savedUsers" | "cart" | "discounts";

export type TAccountResponse = Pick<IAccount, TAccountResponseKeys>;

/**
* @swagger
* components:
*  schemas:
*      AccountSearchRequest:
*       type: object
*       properties:
*         username:
*           type: string
 *          required: false
*         accountStatus:
*           type: string
 *          required: false
*         dateCreated:
*           type: string
 *          required: false
*         orderCount:
*           type: number
 *          required: false
 *      example:
 *        username: ACCOUNT
 *        accountStatus: CLIENT
 *        dateCreated: 2022-02-10T12:30:00
 *        orderCount: 2
*/
export type TAccountSearchRequest = Partial<Pick<IAccount, Exclude<TAccountRequestKeys, "savedUsers"> | "orderCount">>;

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
export type TProductSearchRequest = Partial<Omit<IProduct, "productId">>;

export type TProductCreateRequest = Omit<IProduct, "productId">;