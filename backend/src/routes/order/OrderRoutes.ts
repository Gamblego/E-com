import {IReq, IRes} from "@src/constants/AssignmentInterfaces";
import logger from "jet-logger";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {ISessionAccount} from "@src/models/Account";
import {Privilege} from "@src/constants/AssignmentEnums";
import {PromiseWrapper} from "@src/util/AssignmentUtil";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import {IOrder} from "@src/models/Order";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {TOrderRequest} from "@src/schemaobjects/request/TOrderRequest";
import OrderService from "@src/services/OrderService";

async function getAll(request: IReq<TOrderRequest>, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const orderRequest: TOrderRequest = request.body;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    orderRequest.accountId = webToken.accountId;
  }
  const responseBody: IListResponse<IOrder> = await PromiseWrapper(OrderService.getAll(orderRequest));
  logger.info(`time taken to complete OrderRouter.GetAll: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function getOne(request: IReq, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const { orderId } = request.params;
  const orderRequest: TOrderRequest = { orderId : orderId };
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    orderRequest.accountId = webToken.accountId;
  }
  const responseBody: IOrder = await PromiseWrapper(OrderService.getOne(orderRequest));
  logger.info(`time taken to complete OrderRouter.GetOne: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function createOne(request: IReq<TOrderRequest>, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const orderRequest: TOrderRequest = request.body;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    orderRequest.accountId = webToken.accountId;
  }
  const responseBody: ISaveResponse = await PromiseWrapper(OrderService.createOne(orderRequest));
  logger.info(`time taken to complete OrderRouter.CreateOne: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function deleteOne(request: IReq, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const {orderId} = request.params;
  const orderRequest: TOrderRequest = {orderId: orderId};
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if (webToken.privilege !== Privilege.Admin) {
    orderRequest.accountId = webToken.accountId;
  }
  const responseBody: ISaveResponse = await PromiseWrapper(OrderService.deleteOne(orderRequest));
  logger.info(`time taken to complete OrderRouter.DeleteOne: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function checkoutOne(request: IReq, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const { orderId } = request.params;
  const orderRequest: TOrderRequest = { orderId : orderId };
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    orderRequest.accountId = webToken.accountId;
  }
  const responseBody: ISaveResponse = await PromiseWrapper(OrderService.checkoutOne(orderRequest));
  logger.info(`time taken to complete OrderRouter.CheckoutOne: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function addProduct(request: IReq<TOrderRequest>, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const { orderId } = request.params;
  const orderRequest: TOrderRequest = request.body;
  orderRequest.orderId = orderId;
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    orderRequest.accountId = webToken.accountId;
  }
  const responseBody: ISaveResponse = await PromiseWrapper(OrderService.addProduct(orderRequest));
  logger.info(`time taken to complete OrderRouter.AddProduct: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function addDiscount(request: IReq, response: IRes): Promise<IRes> {
  const startTime = Date.now();
  const { orderId } = request.params;
  const orderRequest: TOrderRequest = { orderId : orderId };
  const webToken: ISessionAccount = response.locals.sessionUser!;
  if(webToken.privilege !== Privilege.Admin) {
    orderRequest.accountId = webToken.accountId;
  }
  const responseBody: ISaveResponse = await PromiseWrapper(OrderService.addDiscount(orderRequest));
  logger.info(`time taken to complete OrderRouter.AddDiscount: ${Date.now() - startTime}`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

export default {
  getAll,
  getOne,
  createOne,
  deleteOne,
  checkoutOne,
  addProduct,
  addDiscount
};