import React, { useContext, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { setPagination } from "../../context/paginationContext/paginationAction";
import ProductTable from "../../components/ProductTable/ProductTable";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { notify } from "../../utils/showToast";
import { ProductsContext } from "../../context/productContext/ProductContext";
import { getProducts } from "../../context/productContext/services";
function Product() {
  const { dispatch, data } = useContext(PaginationContext);
  const { dispatch: dispatchProducts, products } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.organization === "supplier") {
      notify("error", "You are not allowed to access this page");
      navigate("/dashboard");
      return;
    }
    !products && getProducts(dispatchProducts);
    products &&
      dispatch(
        setPagination({
          ...data,
          data: products,
          start: 0,
          page: 1,
          perPage: 7,
          table: <ProductTable />,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, products]);
  return (
    <div className="d-flex flex-column ">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1 className="text-intro "> I'm manufacturer, Kashuken</h1>
        <div>
          <button className="btn btn-success">+ Add</button>
        </div>
      </div>
      <div>{products && <Pagination />}</div>
    </div>
  );
}

export default Product;
