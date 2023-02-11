import {Router} from "express";
import JetValidator from "jet-validator";
import Paths, {DEFAULT_PATH} from "@src/constants/Paths";
import OrderRoutes from "@src/routes/order/OrderRoutes";

const orderRouter = Router(), validate = JetValidator();

orderRouter.post(
    Paths.Order.All,
    OrderRoutes.getAll
);

orderRouter.get(
    Paths.Order.Get,
    validate(["orderId", "string", "params"]),
    OrderRoutes.getOne
)

orderRouter.post(
    DEFAULT_PATH,
    OrderRoutes.createOne
)

orderRouter.delete(
    Paths.Order.Delete,
    OrderRoutes.deleteOne
)

orderRouter.get(
    Paths.Order.Checkout,
    validate(["orderId", "string", "params"]),
    OrderRoutes.checkoutOne
)

orderRouter.post(
    Paths.Order.AddProduct,
    validate(["orderId", "string", "params"]),
    OrderRoutes.addProduct
)

orderRouter.get(
    Paths.Order.AddDiscount,
    validate(["orderId", "string", "params"]),
    OrderRoutes.addDiscount
)


export default orderRouter;