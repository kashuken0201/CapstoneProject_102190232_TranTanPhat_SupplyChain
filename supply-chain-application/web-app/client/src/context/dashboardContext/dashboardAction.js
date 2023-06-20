import { GET_DASHBOARD } from "./dashboardType";

export const getDashboardAction = (data) => ({
  type: GET_DASHBOARD,
  payload: data,
});
