"use strict";

import user from "./user.model.js";

const test = async () => {
  const args = {
    user: {
      email: "kashuken@gmail.com",
      password: "123456",
      username: "",
      address: "",
      userType: "",
      role: "client"
    },
    org: {
      orgName: "supplier"
    }
  }
    
  const tmp = Object.values(args);
  const params = Object.values(tmp[0]);
  let res = await user.signup(Object.values(tmp[1]).toString(), params);

  // const networkObj = await network.connect("retailer", "admin", "supplychain");
  // res = await network.query(networkObj, "GetAllUsers");
  console.log(res);
};

export default {
  test,
};

// User Testing
