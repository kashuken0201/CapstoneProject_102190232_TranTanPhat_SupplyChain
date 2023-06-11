import React, { useContext, useEffect } from "react";
import Pagination from "../../components/Pagination";
import Products from "../../assets/data/products/products.json";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { setPagination } from "../../context/paginationContext/paginationAction";
import ProductTable from "../../components/ProductTable/ProductTable";
function Product() {
  const { dispatch, data } = useContext(PaginationContext);

  useEffect(() => {
    dispatch(
      setPagination({
        ...data,
        data: Products,
        table: <ProductTable />,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="d-flex flex-column">
      <h1 className="text-intro mt-4"> I'm manufacturer, Kashuken</h1>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default Product;
