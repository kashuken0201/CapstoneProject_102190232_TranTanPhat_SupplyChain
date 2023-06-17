import { GET_RAWS } from "./rawType";

export const getRawsAction = (raws) => ({
  type: GET_RAWS,
  payload : raws
});
