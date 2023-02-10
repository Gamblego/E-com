/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        code:
 *          type: string
 *        message:
 *          type: string
 *      example:
 *        code: INVALID_REQUEST_ERROR
 *        message: Invalid data/params
 */

/**
 * The Error Object
 */
export interface IError {
  code: string;
  message: string;
}