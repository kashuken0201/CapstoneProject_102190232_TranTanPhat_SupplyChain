import React, { useContext } from "react";
import ProductRow from "./ProductRow";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";

function ProductTable() {
  const { data } = useContext(PaginationContext);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Manufacturer</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.data.slice(data.start, data.perPage).map((item, i) => (
            <ProductRow key={i} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
