import { userService } from "../../Services/userService";
import { TOKEN, USER_LOGIN } from "../../utils/constants";
import {
  logOut,
  signInFailure,
  signInStart,
  signInSuccess,
} from "./authAction";

export const signIn = async (user, dispatch) => {
  dispatch(signInStart());
  try {
    const userlogin = await userService.login(user);
    localStorage.setItem(TOKEN, userlogin.data.token);
    localStorage.setItem(
      USER_LOGIN,
      JSON.stringify({
        id: userlogin.data.user._id,
        username: userlogin.data.user.username,
        organization: user.organization,
        role: userlogin.data.user.role,
      })
    );
    dispatch(
      signInSuccess({ ...userlogin.data.user, organization: user.organization })
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
