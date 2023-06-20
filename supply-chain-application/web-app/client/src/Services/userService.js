import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super("");
  }

  login = (account) => {
    return this.post(`users/login`, account);
  };

  logout = (account) => {
    return this.post(`users/logout`, account);
  };

  getUserService = (organization) => {
    return this.get(`users/${organization}`);
  };
}

export const userService = new UserService();
