import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserTable from "../../components/UsersTable/UserTable";
import Pagination from "../../components/Pagination";
import CreateUserModal from "../../components/CreateUserModal";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { UsersContext } from "../../context/userContext/UserContext";
import { setPagination } from "../../context/paginationContext/paginationAction";
import { getUsers } from "../../context/userContext/services";
import { notify } from "../../utils/showToast";

function Users() {
  const { dispatch, data } = useContext(PaginationContext);
  const { user } = useContext(AuthContext);
  const { dispatch: dispatchUsers, users } = useContext(UsersContext);

  const [modalShow, setModalShow] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      notify("error", "You are not allowed to access this page");
      navigate("/dashboard");
      return;
    }
    !users && getUsers(dispatchUsers, user.organization);
    users &&
      dispatch(
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
        <h1 className="text-intro "> I'm admin of {user.organization}, Kashuken</h1>
        <div>
        <button
            className="btn btn-success"
            onClick={() => setModalShow(true)}
          >
            + Add
          </button>
        </div>
      </div>
      <div>{users && <Pagination />}</div>
      <CreateUserModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Users;
