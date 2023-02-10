/**
 * @swagger
 * components:
 *   schemas:
 *     ListResponse:
 *       type: object
 *       properties:
 *         totalRecords:
 *          type: integer
 *         data:
 *          type: array
 *          items:
 *              type: object
 *       example:
 *          totalRecords: 1
 *          data: [{'accountId' : 'ACCOUNT123',
 *                  'username' : 'username',
 *                  'password' : 'password',
 *                  'accountStatus' : 'ACTIVE',
 *                  'dateCreated' : '2022-02-09T12:00:00',
 *                  'privilege' : 'CLIENT',
 *                  'orderCount' : 1
 *                  }]
 *
 */

/**
 * The List Response Object
 * @interface ListResponse - The ListResponse Object
 * @field totalRecords - total number of records
 * @field data - the data being returned
 */
export interface IListResponse<T> {
    totalRecords: number;
    data: T[];
}