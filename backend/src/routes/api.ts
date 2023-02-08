import { Router } from 'express';
import jetValidator from 'jet-validator';

import adminMw from './middleware/adminMw';
import Paths from '../constants/Paths';
import AuthenticationRouter from "@src/routes/authentication/AuthenticationRouter";
import UserRouter from './user/UserRouter';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, AuthenticationRouter);

// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, UserRouter);


// **** Export default **** //

export default apiRouter;
