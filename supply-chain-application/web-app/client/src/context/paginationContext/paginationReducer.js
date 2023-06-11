import { SET_PAGINATION_START } from "./paginationType";

const PaginationReducer = (state, action) => {
  switch (action.type) {
    case SET_PAGINATION_START:
      return {
        data: action.payload,
      };
    default:
      return { ...state };
  }
};

export default PaginationReducer;
