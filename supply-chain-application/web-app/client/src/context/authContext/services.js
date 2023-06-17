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

export const logout = (dispatch) => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER_LOGIN);
  dispatch(logOut());
};

// const userlogin = {
//   data: {
//     user: {
//       _id: "648946f3dfd87584b597bc8e",
//       username: "Supplier Admin",
//       email: "supplier@gmail.com",
//       password:
//         "$2b$08$Dex53vXUe6A2AmBmp5XEQudNBWcg0LpdL3nfLiJYHYZKSRLe9xPhy",
//       address: "VIE",
//       status: "ACTIVE",
//       organization: "supplier",
//       role: "admin",
//       tokens: [
//         {
//           token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDg5NDZmM2RmZDg3NTg0YjU5N2JjOGUiLCJpYXQiOjE2ODY3MTgxOTV9.UBuY4x3eIGYr7UX6mYwHKUANkL1FGyuUBHWRBlEeEow",
//           _id: "648946f3dfd87584b597bc91",
//         },
//       ],
//       __v: 7,
//     },
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDg5NDZmM2RmZDg3NTg0YjU5N2JjOGUiLCJpYXQiOjE2ODY3MzkyNTR9.KHvD56nNrc5ZECx1LtWxsOTsxvKitt4kAPYm77RAb2g",
//   },
// };
