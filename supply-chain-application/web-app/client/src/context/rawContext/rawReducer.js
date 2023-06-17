import { GET_RAWS } from "./rawType";

const RawReducer = (state, action) => {
  switch (action.type) {
    case GET_RAWS:
      return {
        ...state,
        raws: action.payload,
      };
    default:
      return { ...state };
  }
};

export default RawReducer;
