import { SET_PAGINATION_START } from "./paginationType";

export const setPagination = (data) => ({
  type: SET_PAGINATION_START,
  payload: data,
});
