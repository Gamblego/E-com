import {Router} from "express";
import JetValidator from "jet-validator";
import Paths from "@src/constants/Paths";
import AdminRoutes from "@src/routes/admin/AdminRoutes";

const adminRouter = Router(), validate = JetValidator();

adminRouter.get(
    Paths.Admin.Summary,
    AdminRoutes.getSummary
)

adminRouter.get(
    Paths.Admin.DiscountCode,
    validate(["accountId", "string", "params"]),
    AdminRoutes.addDiscountCode
)

export default adminRouter;