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
    if (res.status === 200) {
      getProducts(dispatch);
    } else {
      notify("error", res.message);
    }
  } catch {}
};

export const updateProduct = async (dispatch, product) => {
  try {
    const res = await productService.updateProductService(product);
    if (res.status === 200) {
      getProducts(dispatch);
    } else {
      notify("error", res.message);
    }
  } catch {}
};

export const orderProduct = async (dispatch, productId) => {
  try {
    const res = await productService.orderProductService(productId);
    if (res.data.message) {
      getProducts(dispatch);
      notify("error", res.data.message);
    }
    if (res.status === 200) {
      getProducts(dispatch);
      notify("success", res.data.message);
    } else {
      notify("error", res.message);
    }
  } catch {}
};

export const provideProduct = async (dispatch, productId, distributor) => {
  try {
    const res = await productService.provideProductService(
      productId,
      distributor
    );
    if (res.data.message) {
      getProducts(dispatch);
      notify("error", res.data.message);
    }
    if (res.status === 200) {
      getProducts(dispatch);
      notify("success", res.data.message);
    } else {
      notify("error", res.message);
    }
  } catch {}
};

export const deliverProduct = async (dispatch, productId) => {
  try {
    const res = await productService.deliverProductService(productId);
    if (res.data.message) {
      getProducts(dispatch);
      notify("error", res.data.message);
    }
    if (res.status === 200) {
      getProducts(dispatch);
      notify("success", res.data.message);
    } else {
      notify("error", res.message);
    }
  } catch {}
};

export const receiveProduct = async (dispatch, productId) => {
  try {
    const res = await productService.receiveProductService(productId);
    if (res.data.message) {
      getProducts(dispatch);
      notify("error", res.data.message);
    }
    if (res.status === 200) {
      getProducts(dispatch);
      notify("success", res.data.message);
    } else {
      notify("error", res.message);
    }
  } catch {}
};

export const sellProduct = async (dispatch, productId) => {
  try {
    const res = await productService.sellProductService(productId);
    if (res.data.message) {
      getProducts(dispatch);
      notify("error", res.data.message);
    }
    if (res.status === 200) {
      getProducts(dispatch);
      notify("success", res.data.message);
    } else {
      notify("error", res.message);
    }
  } catch {}
};
