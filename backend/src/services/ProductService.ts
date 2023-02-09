/**
 * get all accounts
 */
import {
  DB_ERROR,
  ID_IS_MANDATORY_ERROR,
  INVALID_REQUEST_ERROR, PRODUCT_NOT_FOUND_ERROR,
  RouteError,
} from "@src/helper/Error";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {IListResponse} from "@src/schemaobjects/response/IListResponse";
import {TProductSearchRequest} from "@src/schemaobjects/types";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {PromiseWrapper} from "@src/util/AssignmentUtil";
import {IProduct} from "@src/models/Product";
import ProductRepository from "@src/repository/ProductRepository";

async function getAllProductsMatchingFilter(product: TProductSearchRequest): Promise<IListResponse<IProduct>> {
  const products: IProduct[] = await PromiseWrapper(ProductRepository.getAll(), DB_ERROR);
  return {
    totalRecords: products.length,
    data: products
  };
}

async function getProduct(productId: string): Promise<IProduct> {
  const product: IProduct | null = await PromiseWrapper(ProductRepository.getOne(productId), DB_ERROR);
  if(!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND_ERROR);
  }
  return product;
}

async function createProduct(productCreateRequest: IProduct): Promise<ISaveResponse> {
  if(!productCreateRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  await PromiseWrapper(ProductRepository.add(productCreateRequest), DB_ERROR);

  return {
    id: productCreateRequest.productId
  };
}

async function deleteProduct(productId: string): Promise<ISaveResponse> {
  if(!productId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  const productFound: boolean = await PromiseWrapper(ProductRepository.delete(productId), DB_ERROR);

  if(!productFound) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND_ERROR);
  }
  return {
    id: productId
  };
}

export default {
  getAllProductsMatchingFilter,
  getProduct,
  createProduct,
  deleteProduct
};