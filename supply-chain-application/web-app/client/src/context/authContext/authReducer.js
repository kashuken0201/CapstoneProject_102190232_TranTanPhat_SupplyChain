import {
  LOG_OUT,
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
} from "./authType";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case LOG_OUT:
      return {
        user: undefined,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
