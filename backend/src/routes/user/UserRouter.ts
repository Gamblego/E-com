import {Router} from "express";
import JetValidator from "jet-validator";

import Paths, {DEFAULT_PATH} from "@src/constants/Paths";
import UserRoutes from "@src/routes/user/UserRoutes";
import User from "@src/models/User";

const userRouter = Router(), validate = JetValidator();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The User API
 * /api/user/all:
 *  post:
 *    tags:
 *    - User
 *    description: returns a list of all users satisfying the provided request
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
 *          $ref: '#/components/schemas/UserRequest'
 *    responses:
 *      200:
 *        description: |
 *          return the list of all users in a JSON format.
 *          might be empty in case no users are found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListResponse'
 */
userRouter.post(
    Paths.Users.All,
    UserRoutes.getAll,
);

/**
 * @swagger
 * /api/user:
 *  post:
 *    tags:
 *      - User
 *    description: add a new user for the logged in account.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: JSON object containing the user details.
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/UserCreateRequest'
 *    responses:
 *      200:
 *        description: JSON object containing the user id of the newly created user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveResponse'
 */
userRouter.post(
    DEFAULT_PATH,
    validate( "firstName", "lastName"),
    UserRoutes.add,
);

/**
 * @swagger
 * /api/user:
 *  put:
 *    - User
 *    description: update the user with the specified user id.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: JSON object containing the user details and user id of the user to be updated.
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/UserUpdateRequest'
 *    responses:
 *      200:
 *        description: JSON object containing the user id of the updated user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveResponse'
 */
userRouter.put(
    DEFAULT_PATH,
    validate("userId", "firstName", "lastName"),
    UserRoutes.update,
);

/**
 * @swagger
 * /api/user/delete/:userId:
 *  delete:
 *    tags:
 *      - User
 *    description: delete the user with the specified user id.
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *      name: userId
 *      description: The user id of the user to be deleted.
 *      required: true
 *    responses:
 *      200:
 *        description: JSON object containing the user id of the deleted user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveResponse'
 */
userRouter.delete(
    Paths.Users.Delete,
    validate(['userId', 'number', 'params']),
    UserRoutes.delete,
);

export default userRouter;
