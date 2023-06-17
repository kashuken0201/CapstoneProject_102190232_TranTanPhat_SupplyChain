import React, { useContext, useEffect } from "react";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { setPagination } from "../../context/paginationContext/paginationAction";

const Page = () => {
  const { dispatch, data } = useContext(PaginationContext);
  // console.log(data);
  const numberOfPages = Math.ceil(data.data.length / data.limit);

  const navigateToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > numberOfPages) {
      return;
    }
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
      <div className="d-flex justify-content-center pagination">
        {/* {data.page > 2 && (
            <button onClick={() => navigateToPage(1)}>First</button>
          )} */}
        <div className="bg-white rounded-pill px-3">
          <button onClick={() => navigateToPage(data.page - 1)}>
            <i className="fa fa-angle-left"></i>
          </button>

          {[...Array(100)].slice(0, numberOfPages).map((x, i) => (
            <button
              className={`${data.page === i + 1 ? "active" : ""}`}
              key={i}
              onClick={() => navigateToPage(i + 1)}
            >
              <p>{i + 1}</p>
            </button>
          ))}

          <button onClick={() => navigateToPage(data.page + 1)}>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>

        {/* {data.page < Math.ceil(numberOfPages / 2 + 1) && (
          <button onClick={() => navigateToPage(numberOfPages)}>Last</button>
        )} */}
      </div>
    </>
  );
};

function Pagination() {
  return <Page />;
}

export default Pagination;
