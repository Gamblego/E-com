import {Router} from "express";
import JetValidator from "jet-validator";

import AccountRoutes from "@src/routes/account/AccountController";
import Paths, {DEFAULT_PATH} from "@src/constants/Paths";
import {ControllerWrapper} from "@src/util/AssignmentUtil";

const accountRouter = Router(), validate = JetValidator();

/**
 * @swagger
 * /api/account:
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
    ControllerWrapper(AccountRoutes.getAll),
);

/**
 * @swagger
 * /api/account/:accountId:
 *  get:
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
    ControllerWrapper(AccountRoutes.getOne),
)

export default accountRouter;