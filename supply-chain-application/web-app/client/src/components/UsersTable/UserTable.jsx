import React, { useContext } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import UserRow from "./UserRow";

function UserTable() {
  const { data } = useContext(PaginationContext);
  return (
    <div>
      <table
        className="table text-center mt-4"
        style={{ borderCollapse: "separate", borderSpacing: "0 5px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.data.slice(data.start, data.perPage).map((item, i) => (
            <UserRow key={i} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
