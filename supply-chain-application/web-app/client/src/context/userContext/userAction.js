import { GET_USERS } from "./userType";

export const getUsersAction = (users) => ({
  type: GET_USERS,
  payload: users,
});
