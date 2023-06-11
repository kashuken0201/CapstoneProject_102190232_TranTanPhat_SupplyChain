import React, { useContext } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import RawRow from "./RawRow";

function RawsTable() {
  const { data } = useContext(PaginationContext);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Supplier</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.data.slice(data.start, data.perPage).map((item, i) => (
            <RawRow key={i} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RawsTable;
