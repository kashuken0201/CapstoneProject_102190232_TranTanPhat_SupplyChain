import { createContext, useReducer } from "react";
import RawReducer from "./rawReducer";
import PropTypes from "prop-types";

const INITIAL_STATE = {
  raws: undefined
};

export const RawContext = createContext(INITIAL_STATE);

export const RawContextProvider = (props) => {
  const [state, dispatch] = useReducer(RawReducer, INITIAL_STATE);

  return (
    <RawContext.Provider
      value={{
        dispatch,
        raws: state.raws,
      }}
    >
      {props.children}
    </RawContext.Provider>
  );
};

RawContextProvider.propTypes = {
  children: PropTypes.any,
};
