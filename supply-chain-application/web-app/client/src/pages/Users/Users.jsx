import React, { useContext, useEffect } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { useLocation } from "react-router-dom";
import { setPagination } from "../../context/paginationContext/paginationAction";
import UserData from "../../assets/data/users/manufacturers.json";
import UserTable from "../../components/UsersTable/UserTable";
import Pagination from "../../components/Pagination";

function Users() {
  const { dispatch, data } = useContext(PaginationContext);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(
      setPagination({
        ...data,
        start: 0,
        page: 1,
        perPage: 7,
        data: UserData,
        table: <UserTable />,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1 className="text-intro "> I'm admin of supplier, Kashuken</h1>
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

export default Users;
