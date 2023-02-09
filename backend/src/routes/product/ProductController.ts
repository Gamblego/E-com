/**
 *  Get all accounts
 */
import {IReq, IRes} from "@src/constants/AssignmentInterfaces";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import logger from "jet-logger";
import {TProductSearchRequest} from "@src/schemaobjects/types";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import ProductService from "@src/services/ProductService";
import {IProduct} from "@src/models/Product";

async function getAll
(request: IReq<TProductSearchRequest>, response: IRes) : Promise<IRes> {
  const startTime: number = Date.now();
  const productSearchRequest: TProductSearchRequest = request.body;
  const responseBody: IListResponse<IProduct> =
      await ProductService.getAllProductsMatchingFilter(productSearchRequest);
  logger.info(`time taken to complete ProductRouter.GetAll - ${Date.now() - startTime} ms`)
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function getOne
(request: IReq, response: IRes) : Promise<IRes | void> {
  const startTime: number = Date.now();
  const { productId } = request.params;
  const product: IProduct = await ProductService.getProduct(productId);
  logger.info(`time taken to complete ProductRouter.GetOne - ${Date.now() - startTime} ms`);
  return response.status(HttpStatusCodes.OK).json(product);
}

async function createOne(request: IReq<TProductSearchRequest>, response: IRes) : Promise<IRes | void> {
  const startTime: number = Date.now();
  const productSaveRequest: TProductSearchRequest = request.body;
  const responseBody: ISaveResponse = await ProductService.createProduct(productSaveRequest);
  logger.info(`time taken to complete ProductRouter.CreateOne - ${Date.now() - startTime} ms`);
  return response.status(HttpStatusCodes.OK).json(responseBody);
}

async function deleteOne
(request: IReq, response: IRes) : Promise<IRes> {
  const startTime: number = Date.now();
  const { productId } = request.params;
  const productDeleteResponse: ISaveResponse = await ProductService.deleteProduct(productId);
  logger.info(`time taken to complete AccountRouter.CreateOne - ${Date.now() - startTime} ms`);
  return response.status(HttpStatusCodes.OK).json(productDeleteResponse);
}

export default {
  getAll: getAll,
  getOne: getOne,
  createOne: createOne,
  deleteOne: deleteOne
}