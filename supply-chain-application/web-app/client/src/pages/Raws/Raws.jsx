import React, { useContext, useEffect } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import RawsData from "../../assets/data/raws/raws.json";
import { setPagination } from "../../context/paginationContext/paginationAction";
import RawsTable from "../../components/RawsTable/RawsTable";
import Pagination from "../../components/Pagination";
import { useLocation } from "react-router-dom";

function Raws() {
  const { dispatch, data } = useContext(PaginationContext);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(
      setPagination({
        ...data,
        start: 0,
        page: 1,
        perPage: 7,
        data: RawsData,
        table: <RawsTable />,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-intro "> I'm supplier, Kashuken</h1>
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

export default Raws;
