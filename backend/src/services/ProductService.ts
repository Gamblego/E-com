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
import {TProductCreateRequest, TProductSearchRequest} from "@src/schemaobjects/types";
import {ISaveResponse} from "@src/schemaobjects/response/ISaveResponse";
import {CreateId, PromiseWrapper} from "@src/util/AssignmentUtil";
import {IProduct} from "@src/models/Product";
import ProductRepository from "@src/repository/ProductRepository";

/**
 * get all products matching the given filter.
 * @param {TProductSearchRequest} product the object given query filter
 * @returns Promise containing all products matching the given filter
 * @throws DB_ERROR if database access throws error
 * @see TProductSearchRequest
 * @see IProduct
 * @see IListResponse
 */
async function getAllProductsMatchingFilter(product: TProductSearchRequest): Promise<IListResponse<IProduct>> {
  const products: IProduct[] = await PromiseWrapper(ProductRepository.getAll(product));
  return {
    totalRecords: products.length,
    data: products
  };
}

/**
 * fetch the product whose productId is given.
 * @param {string} productId the I'd for which to fetch the product.
 * @returns Promise containing the product whose productId was provided.
 * @throws DB_ERROR if database access throws error
 * @throws PRODUCT_NOT_FOUND_ERROR if no product exists for given productId
 * @see IProduct
 */
async function getProduct(productId: string): Promise<IProduct> {
  const product: IProduct | null = await PromiseWrapper(ProductRepository.getOne(productId));
  if(!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PRODUCT_NOT_FOUND_ERROR);
  }
  return product;
}

/**
 * create a product with given details.
 * @param {IProduct} productCreateRequest object containing product details.
 * @returns Promise containing the productId of the created product.
 * @throws DB_ERROR if database access throws error.
 * @throws INVALID_REQUEST_ERROR if productCreateRequest is null or invalid.
 * @see TProductSearchRequest
 * @see ISaveResponse
 */
async function createProduct(productCreateRequest: TProductCreateRequest): Promise<ISaveResponse> {
  if(!productCreateRequest) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, INVALID_REQUEST_ERROR);
  }

  const product: IProduct = {
    productId: CreateId("product"),
    productName: productCreateRequest.productName,
    description: productCreateRequest.description,
    price: productCreateRequest.price,
    stockCount: productCreateRequest.stockCount,
    seller: productCreateRequest.seller
  }

  await PromiseWrapper(ProductRepository.add(product));

  return {
    id: product.productId
  };
}


/**
 * delete the product with given productId.
 * @param {string} productId I'd of the product to be deleted.
 * @returns Promise containing the productId of the deleted product.
 * @throws DB_ERROR if database access throws error.
 * @throws INVALID_REQUEST_ERROR if productId is null or invalid.
 * @throws PRODUCT_NOT_FOUND_ERROR if no product exists with the given productId
 * @see ISaveResponse
 */
async function deleteProduct(productId: string): Promise<ISaveResponse> {
  if(!productId) {
    throw new RouteError(HttpStatusCodes.UNPROCESSABLE_ENTITY, ID_IS_MANDATORY_ERROR);
  }

  const productFound: boolean = await PromiseWrapper(ProductRepository.delete(productId));

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