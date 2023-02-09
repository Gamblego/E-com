import {Router} from "express";
import JetValidator from "jet-validator";

import Paths from "@src/constants/Paths";
import {ControllerWrapper} from "@src/util/AssignmentUtil";
import ProductController from "@src/routes/product/ProductController";

const productRouter = Router(), validate = JetValidator();

/**
 * @swagger
 * /api/product/all:
 *  post:
 *    description: returns a list of all products satisfying the provided request
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: |
 *        JSON object containing the parameters on which to filter
 *        the database
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/ProductSearchRequest'
 *    responses:
 *      200:
 *        description: |
 *          return the list of all products in a JSON format.
 *          might be empty in case no products are found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */
productRouter.post(
    Paths.Product.All,
    ControllerWrapper(ProductController.getAll),
);

/**
 * @swagger
 * /api/product/:productId:
 *  delete:
 *    description: returns a single product entity whose id matches the provided productId
 *    parameters:
 *      - in: path
 *        name: productId
 *        required: true
 *        description: the product ID pertaining to the product entity
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: returns the product entity in the given format
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductResponse'
 *      404:
 *        description: could not find the product pertaining to the specified productId
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
productRouter.get(
    Paths.Account.Get,
    validate(['id', 'string', 'params']),
    ControllerWrapper(ProductController.getOne),
);

/**
 * @swagger
 * /api/product/:productId:
 *  get:
 *    description: deletes the product entity whose id matches the provided productId
 *    parameters:
 *      - in: path
 *        name: productId
 *        required: true
 *        description: the product ID pertaining to the product entity
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: returns the product id of the product entity in the given format
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveResponse'
 *      404:
 *        description: could not find the account pertaining to the specified accountId
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
productRouter.delete(
    Paths.Account.Delete,
    validate(['id', 'string', 'params']),
    ControllerWrapper(ProductController.deleteOne),
);

/**
 * @swagger
 * /api/product/:
 *  post:
 *    description: creates a new account with the given parameters
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: |
 *        JSON object containing the parameters on which to
 *        create the account
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/AccountRequest'
 *    responses:
 *      200:
 *        description: successfully created the given account and the account id is returned
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveResponse'
 *      422:
 *        description: one or more fields were missing or invalid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
productRouter.post(
    Paths.Account.Base,
    validate('productId', 'productName', 'price', 'seller'),
    ControllerWrapper(ProductController.createOne),
);

export default productRouter;