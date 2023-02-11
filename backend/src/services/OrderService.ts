import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import {IOrder} from "@src/models/Order";
import {TOrderRequest} from "@src/schemaobjects/request/TOrderRequest";
import {CreateId, PromiseWrapper} from "@src/util/AssignmentUtil";
import {
  ID_IS_MANDATORY_ERROR,
  INVALID_REQUEST_ERROR,
  ORDER_NOT_FOUND_ERROR,
  PRODUCT_NOT_FOUND_ERROR,
  RouteError,
  USER_UNAUTHORIZED_ERROR
} from "@src/helper/Error";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import OrderRepository from "@src/repository/OrderRepository";
import {DiscountStatus, OrderStatus, TransactionStatus} from "@src/constants/AssignmentEnums";
import AccountRepository from "@src/repository/AccountRepository";
import {IAccount} from "@src/models/Account";
import {IDiscount} from "@src/models/Discount";
import DiscountRepository from "@src/repository/DiscountRepository";
import {ITransaction} from "@src/models/Transaction";
import TransactionRepository from "@src/repository/TransactionRepository";
import ProductRepository from "@src/repository/ProductRepository";
import {IProduct} from "@src/models/Product";

/**
 * get all orders matching the given filter.
 * @param {TOrderRequest} orderRequest the object given query filter
 * @returns Promise containing all orders matching the given filter
 * @throws DB_ERROR if database access throws error
 * @see TOrderRequest
 * @see IOrder
 * @see IListResponse
 */
async function getAll(orderRequest: TOrderRequest): Promise<IListResponse<IOrder>> {
  const filter: IOrder = {
    orderId : orderRequest.orderId,
    createdBy : orderRequest.accountId,
    orderStatus: orderRequest.orderStatus,
    dateCreated: orderRequest.dateCreated,
    totalAmount: orderRequest.totalAmount,
    netAmount: orderRequest.netAmount
  }
  const orders: IOrder[] = await PromiseWrapper(OrderRepository.getAll(filter));
  return {
    totalRecords: orders.length,
    data: orders
  };
}

/**
 * fetch the order whose orderId is given.
 * @param {TOrderRequest} orderRequest object containing the order id of the order and the account if of the account which has placed the order..
 * @returns Promise containing the order whose orderId was provided.
 * @throws DB_ERROR if database access throws error
 * @throws ORDER_NOT_FOUND_ERROR if no product exists for given productId
 * @see IOrder
 */
async function getOne(orderRequest: TOrderRequest): Promise<IOrder> {
  const order: IOrder | null = await PromiseWrapper(OrderRepository.getOne(orderRequest.orderId!));
  if(!order) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, ORDER_NOT_FOUND_ERROR);
  }
  if(order?.createdBy !== orderRequest.accountId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  return order;
}

/**
 * create a order with given details.
 * @param {TOrderRequest} orderRequest object containing order details.
 * @returns Promise containing the orderId of the created order.
 * @throws DB_ERROR if database access throws error.
 * @throws INVALID_REQUEST_ERROR if orderRequest is null or invalid.
 * @see TOrderRequest
 * @see ISaveResponse
 */
async function createOne(orderRequest: TOrderRequest): Promise<ISaveResponse> {
  if(!orderRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  let account: IAccount | null = await PromiseWrapper(AccountRepository.getOne(orderRequest.accountId!));

  if(!account || account.cart !== undefined) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  const order: IOrder = {
    orderId: CreateId("product"),
    createdBy: orderRequest.accountId,
    dateCreated: new Date(),
    orderStatus: OrderStatus.PENDING,
    orderItems: [],
    totalAmount: 0,
    netAmount: 0,
    appliedDiscount: undefined
  }

  account.cart = order.orderId;
  await PromiseWrapper(AccountRepository.update(account));

  await PromiseWrapper(OrderRepository.add(order));

  return {
    id: order.orderId!
  };
}


/**
 * delete the order with given orderId.
 * @param {TOrderRequest} orderRequest I'd of the orderId to be deleted.
 * @returns Promise containing the orderId of the deleted product.
 * @throws DB_ERROR if database access throws error.
 * @throws INVALID_REQUEST_ERROR if orderId is null or invalid.
 * @throws PRODUCT_NOT_FOUND_ERROR if no order exists with the given orderId
 * @see ISaveResponse
 */
async function deleteOne(orderRequest: TOrderRequest): Promise<ISaveResponse> {
  if(!orderRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  const order: IOrder | null = await PromiseWrapper(OrderRepository.getOne(orderRequest.orderId!));
  if(!order) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND_ERROR);
  }
  if(order.createdBy !== orderRequest.accountId) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, USER_UNAUTHORIZED_ERROR);
  }

  let account: IAccount | null = await PromiseWrapper(AccountRepository.getOne(orderRequest.accountId!));
  if(!account || account.cart !== order.orderId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  account.cart = undefined;
  await PromiseWrapper(AccountRepository.update(account));

  await PromiseWrapper(OrderRepository.delete(orderRequest.orderId!));

  return {
    id: orderRequest.orderId!
  };
}

async function checkoutOne(orderRequest: TOrderRequest): Promise<ISaveResponse> {
  if(!orderRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  let order: IOrder | null = await PromiseWrapper(OrderRepository.getOne(orderRequest.orderId!));
  if(!order) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ORDER_NOT_FOUND_ERROR);
  }

  let discounts: IDiscount[] =
      await PromiseWrapper(DiscountRepository.getAll({ createdTo: orderRequest.accountId}));

  for(let i=0;i<discounts.length;i++) {
    let discount = discounts[i];
    if(discount.discountStatus === DiscountStatus.ACTIVE) {
      discount.discountStatus =
          order!.appliedDiscount !== undefined ? DiscountStatus.APPLIED : DiscountStatus.EXPIRED;
      order.netAmount = order.totalAmount! * 0.9;
      await PromiseWrapper(DiscountRepository.update(discount));
    }
  }

  const transaction: ITransaction = {
    transactionId: CreateId("transcation"),
    order: order.orderId!,
    dateCreated: new Date(),
    amountPayable: order.netAmount!,
    initiatedBy: order.createdBy!,
    status: TransactionStatus.DONE
  }
  await PromiseWrapper(TransactionRepository.add(transaction));

  let account: IAccount | null = await PromiseWrapper(AccountRepository.getOne(order.createdBy!));
  if(!account) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }
  account.cart = undefined;
  await PromiseWrapper(AccountRepository.update(account));

  order.orderStatus = OrderStatus.CHECKED_OUT;
  await PromiseWrapper(OrderRepository.update(order));

  return {
    id: order.orderId!
  }
}

async function addProduct(orderRequest: TOrderRequest): Promise<ISaveResponse> {
  if(!orderRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  let order: IOrder | null = await PromiseWrapper(OrderRepository.getOne(orderRequest.orderId!));
  if(!order || !order.orderItems || order.createdBy !== orderRequest.accountId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ORDER_NOT_FOUND_ERROR);
  }

  order.orderItems = orderRequest.orderItems;
  order.totalAmount = 0;
  for(let item of order.orderItems!) {
    const product: IProduct | null = await PromiseWrapper(ProductRepository.getOne(item.productId));
    if(!product || product.stockCount < item.count) {
      throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
    }
    product.stockCount -= item.count;
    await PromiseWrapper(ProductRepository.update(product));

    order.totalAmount += item.count * product.price;
  }
  await PromiseWrapper(OrderRepository.update(order));

  return {
    id: order.orderId!
  }
}

async function addDiscount(orderRequest: TOrderRequest): Promise<ISaveResponse> {
  if(!orderRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  let order: IOrder | null = await PromiseWrapper(OrderRepository.getOne(orderRequest.orderId!));
  if(!order || !order.orderItems || order.createdBy !== orderRequest.accountId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ORDER_NOT_FOUND_ERROR);
  }

  const discounts: IDiscount[] = await PromiseWrapper(DiscountRepository.getAll({
    createdTo: orderRequest.accountId,
    discountStatus: DiscountStatus.ACTIVE
  }))
  if(discounts.length !== 1) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  let discount = discounts[0];
  order.appliedDiscount = discount.discountId;

  await PromiseWrapper(OrderRepository.update(order));

  return {
    id: order.orderId!
  }
}

export default {
  getAll,
  getOne,
  createOne,
  deleteOne,
  checkoutOne,
  addProduct,
  addDiscount
}