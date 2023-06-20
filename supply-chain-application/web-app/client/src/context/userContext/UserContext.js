import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import UserReducer from "./userReducer";

const INITIAL_STATE = {
  users: undefined,
};

export const UsersContext = createContext(INITIAL_STATE);

export const UsersContextProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UsersContext.Provider
      value={{
        dispatch,
        users: state.users,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

UsersContextProvider.propTypes = {
  children: PropTypes.any,
};
