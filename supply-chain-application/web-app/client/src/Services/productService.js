import { baseService } from "./baseService";

export class ProductService extends baseService {
  constructor() {
    super("");
  }

  getProductsService = () => {
    return this.get(`products`);
}
}

export const productService = new ProductService();
