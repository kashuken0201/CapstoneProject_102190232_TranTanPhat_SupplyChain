import { baseService } from "./baseService";

export class ProductService extends baseService {
  constructor() {
    super("");
  }

  getProductsService = () => {
    return this.get(`products`);
  };

  createProductService = (product) => {
    return this.post(`products/create`, { product });
  };

  updateProductService = (product) => {
    return this.post(`products/${product._id}/update`, { product });
  };

  orderProductService = (productId) => {
    return this.post(`products/${productId}/order`);
  };

  provideProductService = (productId, distributor) => {
    return this.post(`products/${productId}/provide`, { distributor });
  };

  deliverProductService = (productId) => {
    return this.post(`products/${productId}/deliver`);
  };

  receiveProductService = (productId) => {
    return this.post(`products/${productId}/receive`);
  };

  sellProductService = (productId) => {
    return this.post(`products/${productId}/sell`);
  };
}

export const productService = new ProductService();
