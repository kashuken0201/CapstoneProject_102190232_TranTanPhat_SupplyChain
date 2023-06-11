import React from "react";

function ProductRow({data}) {
  return (
    <tr>
      <td>{data.ProductId}</td>
      <td>{data.ProductName}</td>
      <td>{data.Price}</td>
      <td>{data.Dates.Manufacturered}</td>
      <td>{data.Actors.ManufacturerId}</td>
      <td>{data.Status}</td>
      <td>...</td>
    </tr>
  );
}

export default ProductRow;
