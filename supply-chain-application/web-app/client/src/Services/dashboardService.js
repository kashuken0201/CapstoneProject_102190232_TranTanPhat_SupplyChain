import { baseService } from "./baseService";

export class DashboardService extends baseService {
  constructor() {
    super("");
  }

  getDashboard = () => {
    return this.get(`users/dashboard`);
  };
}

export const dashboardService = new DashboardService();
