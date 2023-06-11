import React, { useContext, useEffect } from 'react'
import { PaginationContext } from '../../context/paginationContext/PaginationContext';
import RawsData from "../../assets/data/raws/raws.json";
import { setPagination } from '../../context/paginationContext/paginationAction';
import RawsTable from '../../components/RawsTable/RawsTable';
import Pagination from '../../components/Pagination';

function Raws() {
  const { dispatch, data } = useContext(PaginationContext);

  useEffect(() => {
    dispatch(
      setPagination({
        ...data,
        data: RawsData,
        table: <RawsTable />,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="d-flex flex-column">
      <h1 className="text-intro mt-4"> I'm supplier, Kashuken</h1>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default Raws