import { createContext, useReducer } from "react";
import PaginationReducer from "./paginationReducer";

const INITIAL_STATE = {
  data: {
    data: [],
    currentData: [],
    limit: 7,
    total: 10,
    start: 0,
    page: 1,
    perPage: 7,
    showPrevButton: false,
    showFirstPageButton: false,
    showNextButton: false,
    showLastPageButton: false,
    table: <></>,
  },
};

export const PaginationContext = createContext(INITIAL_STATE);

export const PaginationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PaginationReducer, INITIAL_STATE);

  return (
    <PaginationContext.Provider
      value={{
        dispatch,
        data: state.data,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
