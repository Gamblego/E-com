import {Router} from "express";
import Paths from "@src/constants/Paths";
import AuthRoutes from "./AuthenticationRoutes";
import JetValidator from "jet-validator";

const authenticationRouter = Router(), validate = JetValidator();

/**
 * @swagger
 * /api/auth/login:
 *  get:
 *    description: endpoint for login
 *    requestBody:
 *      description: JSON object containing username and password entered by user
 *      required: true
 *      content:
 *        application/json
 *        schema:
 *          loginRequest:
 *            properties:
 *              username:
 *                type: string
 *                required: true
 *              password:
 *                type: string
 *                required: true
 *    consumes:
 *      application/json
 *    responses:
 *      200:
 *        description: confirmation of user login. A cookie is sent with the response for session tracking
 *      401:
 *        description: user login attempt failed.
 *        content:
 *          application/json
 *          schema; '#/components/schemas/Error'
 */
authenticationRouter.post(
    Paths.Auth.Login,
    validate('username', 'password'),
    AuthRoutes.login,
);

/**
 * @swagger
 * /api/auth/logout:
 *  get:
 *    description: endpoint for logout
 *    responses:
 *      200:
 *        description: confirmation of user logout. the set session Cookie is removed
 *      422:
 *        description: Error occurred while logging out
 *        content:
 *          application/json
 *          schema; '#/components/schemas/Error'
 */
authenticationRouter.get(
    Paths.Auth.Logout,
    AuthRoutes.logout,
);

export default authenticationRouter
;
