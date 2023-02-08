import {Router} from "express";
import Paths from "@src/constants/Paths";
import AuthRoutes from "./AuthenticationRoutes";
import JetValidator from "jet-validator";

const authenticationRouter = Router(), validate = JetValidator();

/**
 * authenticate and login a user
 */
authenticationRouter.post(
    Paths.Auth.Login,
    validate('username', 'password'),
    AuthRoutes.login,
);

/**
 * logout a user
 */
authenticationRouter.get(
    Paths.Auth.Logout,
    AuthRoutes.logout,
);

export default authenticationRouter
;
