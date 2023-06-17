
import { userService } from "../../Services/userService";
import { getUsersAction } from "./userAction";

export const getUsers = async (dispatch,organization) => {
  try {
    const users = await userService.getUserService(organization);
    dispatch(getUsersAction(users.data));
  } catch {}
};
