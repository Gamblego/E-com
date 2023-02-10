import {Router} from "express";
import JetValidator from "jet-validator";

import AccountController from "@src/routes/account/AccountController";
import Paths from "@src/constants/Paths";
import {ControllerWrapper} from "@src/util/AssignmentUtil";

const accountRouter = Router(), validate = JetValidator();

/**
 * @swagger
 * /api/account/all:
 *  post:
 *    description: returns a list of all accounts satisfying the provided request
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
 *          $ref: '#/components/schemas/AccountSearchRequest'
*    responses:
 *      200:
 *        description: |
 *          return the list of all accounts in a JSON format.
 *          might be empty in case no accounts are found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */
accountRouter.post(
    Paths.Account.All,
    ControllerWrapper(AccountController.getAll),
);

/**
 * @swagger
 * /api/account/:accountId:
 *  delete:
 *    description: returns a single account entity whose id matches the provided accountId
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        description: the account ID pertaining to the account entity
 *        schema:
 *          type: string
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: returns the account entity in the given format
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 *      404:
 *        description: could not find the account pertaining to the specified accountId
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
accountRouter.get(
    Paths.Account.Get,
    validate(['id', 'string', 'params']),
    ControllerWrapper(AccountController.getOne),
);

/**
 * @swagger
 * /api/account/:accountId:
 *  get:
 *    description: deletes the account entity whose id matches the provided accountId
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        description: the account ID pertaining to the account entity
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: returns the account id of the account entity in the given format
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
accountRouter.delete(
    Paths.Account.Delete,
    validate(['id', 'string', 'params']),
    ControllerWrapper(AccountController.deleteOne),
);

/**
 * @swagger
 * /api/account/:
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
accountRouter.post(
    Paths.Account.Base,
    validate('accountId', 'username', 'password'),
    ControllerWrapper(AccountController.createOne),
);

export default accountRouter;