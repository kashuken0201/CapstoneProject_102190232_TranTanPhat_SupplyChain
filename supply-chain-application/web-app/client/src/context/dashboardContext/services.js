import { dashboardService } from "../../Services/dashboardService";
import { getDashboardAction } from "./dashboardAction";

export const getDashboard = async (dispatch) => {
  try {
    const data = await dashboardService.getDashboard();
    dispatch(getDashboardAction(data.data));
  } catch {}
};
