import { userService } from "../../Services/userService";
import { TOKEN, USER_LOGIN } from "../../utils/constants";
import {
  logOut,
  signInFailure,
  signInStart,
  signInSuccess,
} from "./authAction";
import { notify } from "../../utils/showToast";

export const signIn = async (user, dispatch) => {
  dispatch(signInStart());
  try {
    const res = await userService.login(user);
    if (res.data.error) {
      notify("error", res.data.error);
      dispatch(signInFailure());
    }
    localStorage.setItem(TOKEN, res.data.token);
    localStorage.setItem(
      USER_LOGIN,
      JSON.stringify({
        id: res.data.user._id,
        username: res.data.user.username,
        organization: user.organization,
        role: res.data.user.role,
      })
    );
    notify("success", res.data.success);
    dispatch(
      signInSuccess({ ...res.data.user, organization: user.organization })
    );
  } catch (err) {
    dispatch(signInFailure());
  }
};

export const logout = async (dispatch) => {
  try {
    // await userService.logout(dispatch.user);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_LOGIN);
    dispatch(logOut());
  } catch (err) {}
};
