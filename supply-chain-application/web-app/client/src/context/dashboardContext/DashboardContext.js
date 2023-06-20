import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import DashboardReducer from "./dashboardReducer";

const INITIAL_STATE = {
  data: undefined,
};

export const DashboardContext = createContext(INITIAL_STATE);

export const DashboardContextProvider = (props) => {
  const [state, dispatch] = useReducer(DashboardReducer, INITIAL_STATE);

  return (
    <DashboardContext.Provider
      value={{
        dispatch,
        data: state.data,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

DashboardContextProvider.propTypes = {
  children: PropTypes.any,
};
