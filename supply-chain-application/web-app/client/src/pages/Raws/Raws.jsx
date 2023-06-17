import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination";
import RawsTable from "../../components/RawsTable/RawsTable";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { setPagination } from "../../context/paginationContext/paginationAction";
import { getRaws } from "../../context/rawContext/services";
import { RawContext } from "../../context/rawContext/RawContext";
import CreateRawModal from "../../components/CreateRawModal";

function Raws() {
  const { dispatch, data } = useContext(PaginationContext);
  const { dispatch: dispatchRaws, raws } = useContext(RawContext);
  const [modalShow, setModalShow] = React.useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
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
        <h1 className="text-intro "> I'm supplier, Kashuken</h1>
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
