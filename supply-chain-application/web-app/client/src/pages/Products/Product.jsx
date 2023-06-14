import React, { useContext, useEffect } from "react";
import Pagination from "../../components/Pagination";
import Products from "../../assets/data/products/products.json";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { setPagination } from "../../context/paginationContext/paginationAction";
import ProductTable from "../../components/ProductTable/ProductTable";
import { useLocation } from "react-router-dom";
function Product() {
  const { dispatch, data } = useContext(PaginationContext);
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(
      setPagination({
        ...data,
        data: Products,
        start: 0,
        page: 1,
        perPage: 7,
        table: <ProductTable />,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <div className="d-flex flex-column ">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1 className="text-intro "> I'm manufacturer, Kashuken</h1>
        <div>
          <button className="btn btn-success">+ Add</button>
        </div>
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default Product;
