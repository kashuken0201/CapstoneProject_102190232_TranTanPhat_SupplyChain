import { rawService } from "../../Services/rawService";
import { notify } from "../../utils/showToast";
import { getRawsAction } from "./rawAction";

export const getRaws = async (dispatch) => {
  try {
    const res = await rawService.getRawsService();
    dispatch(getRawsAction(res.data));
  } catch {}
};

export const createRaw = async (dispatch, raw) => {
  try {
    const res = await rawService.createRawService(raw);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getRaws(dispatch);
  } catch {}
};

export const updateRaw = async (dispatch, rawId) => {
  try {
    // const res = await rawService.supplyRaw(rawId);
    // if (res.status === 200) {
    //   getRaws(dispatch);
    // } else {
    //   notify("error", res.message);
    // }
  } catch {}
};

export const orderRaw = async (dispatch, rawId) => {
  try {
    const res = await rawService.orderRaw(rawId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getRaws(dispatch);
  } catch {}
};

export const supplyRaw = async (dispatch, rawId) => {
  try {
    const res = await rawService.supplyRaw(rawId);
    if (res.data.error) notify("error", res.data.error);
    if (res.data.success) notify("success", res.data.success);
    getRaws(dispatch);
  } catch {}
};
