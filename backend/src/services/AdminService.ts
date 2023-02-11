import OrderRepository from "@src/repository/OrderRepository";
import orderRepository from "@src/repository/OrderRepository";
import {IOrder} from "@src/models/Order";
import {DiscountStatus, OrderStatus} from "@src/constants/AssignmentEnums";
import {CreateId, PromiseWrapper} from "@src/util/AssignmentUtil";
import {IDiscount} from "@src/models/Discount";
import {AdminSummaryResponse} from "@src/schemaobjects/response/AdminSummaryResponse";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {
  DISCOUNT_ALREADY_PRESENT_ERROR,
  INVALID_REQUEST_ERROR,
  NO_CURRENT_ORDER_ERROR,
  NTH_ORDER_ERROR,
  RouteError,
  USER_HAS_DISCOUNT_ERROR,
  USER_NOT_FOUND_ERROR
} from "@src/helper/Error";
import DiscountRepository from "@src/repository/DiscountRepository";
import {IAccount} from "@src/models/Account";
import AccountRepository from "@src/repository/AccountRepository";
import EnvVars from "@src/constants/EnvVars";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";

async function getBusinessSummary(): Promise<AdminSummaryResponse> {
  const filter: IOrder = {
    orderStatus: OrderStatus.COMPLETED
  };
  const orders: IOrder[] = await PromiseWrapper(OrderRepository.getAll(filter));
  let productMap: Map<string, number> = new Map();
  let totalAmount: number = 0, totalDiscountAmount: number = 0;
  for(let i=0;i<orders.length;i++) {
    for(let j=0;j<orders[i].orderItems!.length;j++) {
      let { productId, count } = orders[i].orderItems![j];
      if(!productMap.has(productId)) productMap.set(productId, 0);
      productMap.set(productId, productMap.get(productId)! + count);
    }

    totalAmount += orders[i].totalAmount!;
    totalDiscountAmount += orders[i].totalAmount! - orders[i].netAmount!;
  }

  const discountFilter: IDiscount = {
    discountStatus: DiscountStatus.APPLIED
  }
  const discounts: IDiscount[] = await PromiseWrapper(DiscountRepository.getAll(discountFilter));

  return {
    productsSold: Array.from(productMap),
    totalAmount: totalAmount,
    totalDiscountAmount: totalDiscountAmount,
    discountCodes: discounts
  }
}

async function addDiscountCode(accountId: string): Promise<ISaveResponse> {
  if(!accountId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  const account: IAccount | null = await PromiseWrapper(AccountRepository.getOne(accountId));
  if(!account) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, USER_NOT_FOUND_ERROR);
  }

  const cartId: string = (account.cart ?? '');
  const currentOrder: IOrder | null = await PromiseWrapper(orderRepository.getOne(cartId));
  if(currentOrder == null || currentOrder.orderStatus !== OrderStatus.PENDING) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, NO_CURRENT_ORDER_ERROR);
  }
  if(currentOrder.appliedDiscount !== undefined) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, DISCOUNT_ALREADY_PRESENT_ERROR);
  }

  const discounts: IDiscount[] = await PromiseWrapper(DiscountRepository.getAll({createdTo: accountId}));
  const activeDiscounts = discounts.filter(discount => discount.discountStatus === DiscountStatus.ACTIVE);
  if(activeDiscounts.length > 0) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, USER_HAS_DISCOUNT_ERROR);
  }

  const n_value: number = +EnvVars.N_VALUE;
  if(account.orderCount! % n_value !== n_value - 1) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, NTH_ORDER_ERROR);
  }

  const discount: IDiscount = {
    discountId: CreateId("discount"),
    dateCreated: new Date(),
    discountPercentage: 10,
    discountStatus: DiscountStatus.ACTIVE,
    createdTo: accountId
  };
  await PromiseWrapper(DiscountRepository.add(discount));

  if(account.discounts === undefined) { account.discounts = []; }
  account.discounts.push(discount.discountId!);
  await PromiseWrapper(AccountRepository.update(account));

  return {
    id: discount.discountId!
  }
}

export default {
  getBusinessSummary,
  addDiscountCode
}