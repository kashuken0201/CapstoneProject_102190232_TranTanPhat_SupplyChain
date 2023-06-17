import { GET_USERS } from "./userType";

const UserReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
