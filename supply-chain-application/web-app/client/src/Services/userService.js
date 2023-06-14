import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super("");
  }

  login = (account) => {
    return this.post(`users/login`, account);
}
}

export const userService = new UserService();
