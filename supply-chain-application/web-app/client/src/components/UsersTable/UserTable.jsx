import React, { useContext } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import UserRow from "./UserRow";

function UserTable() {
  const { data } = useContext(PaginationContext);
  console.log(data);
  return (
    <div>
      <table className="table text-center my-4">
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
