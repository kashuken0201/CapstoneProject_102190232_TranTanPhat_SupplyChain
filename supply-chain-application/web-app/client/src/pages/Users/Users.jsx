import React, { useContext, useEffect } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { useLocation, useNavigate } from "react-router-dom";
import { setPagination } from "../../context/paginationContext/paginationAction";
import UserTable from "../../components/UsersTable/UserTable";
import Pagination from "../../components/Pagination";
import { AuthContext } from "../../context/authContext/AuthContext";
import { notify } from "../../utils/showToast";
import { UsersContext } from "../../context/userContext/UserContext";
import { getUsers } from "../../context/userContext/services";

function Users() {
  const { dispatch, data } = useContext(PaginationContext);
  const { user } = useContext(AuthContext);  
  const { dispatch: dispatchUsers, users } = useContext(UsersContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      notify("error", "You are not allowed to access this page");
      navigate("/dashboard");
      return;
    }
    !users && getUsers(dispatchUsers,user.organization);
    users && dispatch(
      setPagination({
        ...data,
        start: 0,
        page: 1,
        perPage: 7,
        data: users,
        table: <UserTable />,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, users]);
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1 className="text-intro "> I'm admin of supplier, Kashuken</h1>
        <div>
          <button className="btn btn-success">+ Add</button>
        </div>
      </div>
      <div>{users && <Pagination />}</div>
    </div>
  );
}

export default Users;
