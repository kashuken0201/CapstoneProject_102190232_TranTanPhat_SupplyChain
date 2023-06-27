import { userService } from "../../Services/userService";
import { getUsersAction } from "./userAction";
import { notify } from "../../utils/showToast";

export const getUsers = async (dispatch, organization) => {
  try {
    const res = await userService.getUserService(organization);
    dispatch(getUsersAction(res.data));
  } catch {}
};

export const signUp = async (dispatch, user) => {
  try {
    const res = await userService.signUpService(user);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getUsers(dispatch, user.organization);
  } catch {}
};
