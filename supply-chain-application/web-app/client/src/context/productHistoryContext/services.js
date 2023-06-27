import { notify } from "../../utils/showToast";
import { productService } from "../../Services/productService";

export const getProductHistories = async (productId) => {
  try {
    const res = await productService.getProductHistoriesSerivce(productId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    return res.data
  } catch {}
};
