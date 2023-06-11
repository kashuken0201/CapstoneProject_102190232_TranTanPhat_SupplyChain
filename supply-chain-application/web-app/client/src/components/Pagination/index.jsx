import React, { useContext, useEffect } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { setPagination } from "../../context/paginationContext/paginationAction";

const Page = () => {
  const { dispatch, data } = useContext(PaginationContext);
  const numberOfPages = Math.ceil(data.data.length / data.limit);

  const navigateToPage = (pageNumber) => {
    dispatch(
      setPagination({
        ...data,
        page: pageNumber,
        start: (pageNumber - 1) * data.limit,
        perPage: pageNumber * data.limit,
      })
    );
  };

  useEffect(() => {
    navigateToPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data.table}
      {data.page > 2 && (
        <button onClick={() => navigateToPage(1)}>First</button>
      )}
      {data.page > 1 && (
        <button onClick={() => navigateToPage(data.page - 1)}>Prev</button>
      )}
      {[...Array(100)].slice(0, numberOfPages).map((x, i) => (
        <button key={i} onClick={() => navigateToPage(i + 1)}>
          {i + 1}
        </button>
      ))}

      {data.page !== numberOfPages && (
        <button onClick={() => navigateToPage(data.page + 1)}>Next</button>
      )}
      {data.page < Math.ceil(numberOfPages / 2 + 1) && (
        <button onClick={() => navigateToPage(numberOfPages)}>Last</button>
      )}
    </>
  );
};

function Pagination() {
  return <Page />;
}

export default Pagination;
