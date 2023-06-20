import { GET_DASHBOARD } from "./dashboardType";

const DashboardReducer = (state, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return { ...state };
  }
};

export default DashboardReducer;
