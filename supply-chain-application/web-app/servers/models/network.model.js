"use strict";

import pkg from "fabric-ca-client";
import { Wallets, Gateway } from "fabric-network";
import appUtil from "../utils/appUtil.js";
import caUtil from "../utils/caUtil.js";
import path from "path";

const getConnectionMaterial = (orgName) => {
  const connectionMaterial = {};
  const _orgName = orgName.toUpperCase();

  connectionMaterial.walletPath = path.join(
    process.cwd(),
    process.env[`${_orgName}_WALLET`]
  );

  connectionMaterial.orgMSP = process.env[`${_orgName}_MSP`];

  return connectionMaterial;
};

const connect = async (orgName, userId, contractName) => {
  const gateway = new Gateway();

  try {
    const ccp = appUtil.buildCCPOrg(orgName);
    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(
      Wallets,
      connectionMaterial.walletPath
    );
    await gateway.connect(ccp, {
      wallet,
      identity: userId,
      discovery: {
        enabled: true,
        asLocalhost: Boolean(process.env.AS_LOCALHOST),
      },
    });

    const network = await gateway.getNetwork(process.env.CHANNEL);
    const contract = await network.getContract(contractName);

    console.log("Connected to fabric network successly.");

    const networkObj = { gateway, network, contract };

    return networkObj;
  } catch (err) {
    console.error(`Fail to connect network: ${err}`);
    await gateway.disconnect();
    return { status: 500, error: err.toString() };
  }
};

const query = async (networkObj, fcn, ...funcAndArgs) => {
  try {
    console.log(`Query parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    const response = await networkObj.contract.evaluateTransaction(
      fcn,
      ...funcAndArgsStrings
    );
    console.log(`Transaction ${funcAndArgs} has been evaluated: ${response}`);

    return appUtil.prettyJSONString(response);
  } catch (err) {
    console.error(`Failed to evaluate transaction: ${err}`);
    return { status: 500, error: err.toString() };
  } finally {
    if (networkObj.gatway) {
      await networkObj.gateway.disconnect();
    }
  }
};

const invoke = async (networkObj, fcn, ...funcAndArgs) => {
  try {
    console.log(`Invoke parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    console.log(funcAndArgsStrings);
    const response = await networkObj.contract.submitTransaction(
      fcn,
      ...funcAndArgsStrings
    );
    console.log(`Transaction ${funcAndArgs} has been submitted: ${response}`);

    return appUtil.prettyJSONString(response);
  } catch (err) {
    console.error(`Failed to submit transaction: ${err}`);
    return { status: 500, error: err.toString() };
  } finally {
    if (networkObj.gatway) {
      await networkObj.gateway.disconnect();
    }
  }
};

const enrollAdmin = async (orgName) => {
  try {
    const ccp = appUtil.buildCCPOrg(orgName);
    const caClient = caUtil.buildCAClient(pkg, ccp, `ca.${orgName}.scm.com`);

    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(
      Wallets,
      connectionMaterial.walletPath
    );

    await caUtil.enrollAdmin(caClient, wallet, connectionMaterial.orgMSP);
  } catch (err) {
    console.error(`Failed to enroll admin user: ${err}`);
    process.exit(1);
  }
};

const registerUser = async (orgName, userId) => {
  try {
    const ccp = appUtil.buildCCPOrg(orgName);
    const caClient = caUtil.buildCAClient(pkg, ccp, `ca.${orgName}.scm.com`);
    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(
      Wallets,
      connectionMaterial.walletPath
    );
    await caUtil.registerAndEnrollUser(
      caClient,
      wallet,
      connectionMaterial.orgMSP,
      userId,
      `${orgName}.department`
    );
  } catch (err) {
    console.error(`Failed to register user ${userId}: ${err}`);
    return { status: 500, error: err.toString() };
  }
};

const checkExistUser = async (userId) => {
  try {
    const userIdentity = await wallet.get(userId);
    if (!userIdentity) {
      console.error(
        `An identity for the user ${userId} does not exist in the wallet. Register ${userId} first`
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Failed: ${err}`);
    return { status: 500, error: err.toString() };
  }
};

const init = async () => {

  // await enrollAdmin("supplier");
  // let networkObj = await connect("supplier", "admin", "supplychain");
  // let args = ["supplieradmin@gmail.com", "supplieradmin", "Luong Thanh Long", "Viet Nam", "supplier", "admin"];
  // let res = await invoke(networkObj, "CreateUser", ...args);

  // await enrollAdmin("manufacturer");
  // networkObj = await connect("manufacturer", "admin", "supplychain");
  // args = ["manufactureradmin@gmail.com", "manufactureradmin", "Pham Van Khai", "Viet Nam", "manufacturer", "admin"];
  // res = await invoke(networkObj, "CreateUser", ...args);

  // await enrollAdmin("distributor");
  // networkObj = await connect("distributor", "admin", "supplychain");
  // args = ["distributoradmin@gmail.com", "distributoradmin", "Le Thanh Nhan", "Viet Nam", "distributor", "admin"];
  // res = await invoke(networkObj, "CreateUser", ...args);

  // await enrollAdmin("retailer");
  // networkObj = await connect("retailer", "admin", "supplychain");
  // args = ["retaileradmin@gmail.com", "retaileradmin", "Doan Chi Hoang", "Viet Nam", "retailer", "admin"];
  // res = await invoke(networkObj, "CreateUser", ...args);

  let res = await query(networkObj, "GetAllUsers");
  console.log(appUtil.prettyJSONString(res))
};

export default {
  connect,
  query,
  invoke,
  enrollAdmin,
  registerUser,
  init,
};
