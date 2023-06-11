import { signInFailure, signInStart, signInSuccess } from "./authAction";

export const signIn = async (user, dispatch) => {
  dispatch(signInStart());
  try {
    dispatch(signInSuccess({user: "abc"}));
  } catch (err) {
    dispatch(signInFailure());
  }
};
