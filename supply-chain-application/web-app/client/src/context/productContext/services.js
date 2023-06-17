
import { productService } from "../../Services/productService";
import { getProductsAction } from "./productAction";

export const getProducts = async (dispatch) => {
  try {
    const products = await productService.getProductsService();
    dispatch(getProductsAction(products.data));
  } catch {}
};
