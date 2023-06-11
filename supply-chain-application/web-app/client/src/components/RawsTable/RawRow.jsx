import React from "react";

function RawRow({data}) {
  return (
    <tr>
      <td>{data.RawId}</td>
      <td>{data.RawName}</td>
      <td>{data.CreateDate}</td>
      <td>{data.SupplierId}</td>
      <td>{data.Status}</td>
      <td>...</td>
    </tr>
  );
}

export default RawRow;
