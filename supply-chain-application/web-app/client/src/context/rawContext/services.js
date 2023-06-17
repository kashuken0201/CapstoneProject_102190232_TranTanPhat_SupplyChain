import { rawService } from "../../Services/rawService";
import { notify } from "../../utils/showToast";
import { getRawsAction } from "./rawAction";

export const getRaws = async (dispatch) => {
  try {
    const raws = await rawService.getRawsService();
    // console.log(raws.data);
    dispatch(getRawsAction(raws.data));
  } catch {}
};

export const createRaws = async (dispatch,raw) => {
  try {
    const raws = await rawService.createRawService(raw);
    if (raws.status === 200) {
      getRaws(dispatch);
    } else {
      notify("error", raws.message);
    }
    // console.log(raws.data);
  } catch {}
};
