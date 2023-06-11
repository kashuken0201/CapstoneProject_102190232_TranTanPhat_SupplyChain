import {
  LOG_OUT,
  SIGN_IN_FAILURE,
  SIGN_IN_START,
  SIGN_IN_SUCCESS
} from "./authType";

// SIGN IN
export const signInStart = () => ({
  type: SIGN_IN_START,
});

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = () => ({
  type: SIGN_IN_FAILURE,
});

export const logout = () => ({
  type: LOG_OUT,
});