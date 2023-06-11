import PropTypes from "prop-types";
import React, { createContext, useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  user: undefined,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.any,
};
