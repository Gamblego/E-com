import {Router} from "express";
import JetValidator from "jet-validator";

import Paths from "@src/constants/Paths";
import UserRoutes from "@src/routes/user/UserRoutes";
import User from "@src/models/User";

const userRouter = Router(), validate = JetValidator();

// Get all users
userRouter.get(
    Paths.Users.Get,
    UserRoutes.getAll,
);

// Add one user
userRouter.post(
    Paths.Users.Add,
    validate(['user', User.instanceOf]),
    UserRoutes.add,
);

// Update one user
userRouter.put(
    Paths.Users.Update,
    validate(['user', User.instanceOf]),
    UserRoutes.update,
);

// Delete one user
userRouter.delete(
    Paths.Users.Delete,
    validate(['id', 'number', 'params']),
    UserRoutes.delete,
);

export default userRouter;
