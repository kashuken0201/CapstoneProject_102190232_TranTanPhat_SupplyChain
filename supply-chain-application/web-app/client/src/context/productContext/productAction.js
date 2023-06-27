import { GET_PRODUCTS } from "./productType";

export const getProductsAction = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});