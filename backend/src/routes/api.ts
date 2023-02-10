import { Router } from 'express';
import jetValidator from 'jet-validator';

import userMw from './middleware/userMw';
import Paths from '../constants/Paths';
import AuthenticationRouter from "@src/routes/authentication/AuthenticationRouter";
import UserRouter from './user/UserRouter';
import AccountRouter from "@src/routes/account/AccountRouter";
import ErrorHandle from "@src/routes/middleware/ErrorHandler";

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, AuthenticationRouter);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userMw, UserRouter);

// Add AccountRouter
apiRouter.use(Paths.Account.Base, userMw, AccountRouter);

// Custom error handler
apiRouter.use(ErrorHandle);

// **** Export default **** //

export default apiRouter;
