import {IDiscount} from "@src/models/Discount";

export interface AdminSummaryResponse {
  totalAmount: number;
  totalDiscountAmount: number;
  productsSold: Array<[string, number]>,
  discountCodes: IDiscount[]
}