import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import RawsTable from "../../components/RawsTable/RawsTable";
import CreateRawModal from "../../components/CreateRawModal";
import { AuthContext } from "../../context/authContext/AuthContext";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { RawContext } from "../../context/rawContext/RawContext";
import { getRaws } from "../../context/rawContext/services";
import { setPagination } from "../../context/paginationContext/paginationAction";
import { notify } from "../../utils/showToast";

function Raws() {
  const { dispatch, data } = useContext(PaginationContext);
  const { dispatch: dispatchRaws, raws } = useContext(RawContext);
  const { user } = useContext(AuthContext);

  const [modalShow, setModalShow] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user.organization !== "supplier" &&
      user.organization !== "manufacturer"
    ) {
      notify("error", "You are not allowed to access this page");
      navigate("/dashboard");
      return;
    }
    !raws && getRaws(dispatchRaws);
    raws &&
      dispatch(
        setPagination({
          ...data,
          start: 0,
          page: 1,
          perPage: 7,
          data: raws,
          table: <RawsTable />,
        })
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, raws]);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-intro ">
          {" "}
          I'm {user.organization}, {user.username}
        </h1>
        <div>
          <button
            className="btn btn-success"
            onClick={() => setModalShow(true)}
          >
            + Add
          </button>
        </div>
      </div>
      <div>{raws && <Pagination />}</div>
      <CreateRawModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Raws;
