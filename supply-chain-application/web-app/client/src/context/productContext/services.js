import { notify } from "../../utils/showToast";
import { productService } from "../../Services/productService";
import { getProductsAction } from "./productAction";

export const getProducts = async (dispatch) => {
  try {
    const res = await productService.getProductsService();
    dispatch(getProductsAction(res.data));
  } catch {}
};

export const createProduct = async (dispatch, product) => {
  try {
    const res = await productService.createProductService(product);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};

export const updateProduct = async (dispatch, product) => {
  try {
    const res = await productService.updateProductService(product);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};

export const orderProduct = async (dispatch, productId) => {
  try {
    const res = await productService.orderProductService(productId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};

export const provideProduct = async (dispatch, productId, distributor) => {
  try {
    const res = await productService.provideProductService(
      productId,
      distributor
    );
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};

export const deliverProduct = async (dispatch, productId) => {
  try {
    const res = await productService.deliverProductService(productId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};

export const receiveProduct = async (dispatch, productId) => {
  try {
    const res = await productService.receiveProductService(productId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};

export const sellProduct = async (dispatch, productId) => {
  try {
    const res = await productService.sellProductService(productId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};

export const verifyProduct = async (dispatch, productId) => {
  try {
    const res = await productService.verifyProductService(productId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getProducts(dispatch);
  } catch {}
};
