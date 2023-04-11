"use strict";

import pkg from "fabric-ca-client";
import { Wallets, Gateway } from "fabric-network";
import { BlockDecoder } from "fabric-common";
import appUtil from "../utils/appUtil.js";
import caUtil from "../utils/caUtil.js";
import path from "path";

const getConnectionMaterial = (orgName) => {
  const connectionMaterial = {};
  const _orgName = orgName.toUpperCase()
  
  connectionMaterial.walletPath = path.join(
    process.cwd(),
    process.env[`${_orgName}_WALLET`]
  );

  connectionMaterial.orgMSP = process.env[`${_orgName}_MSP`];

  return connectionMaterial;
};

const connect = async (orgName, userID, contractName) => {
  const gateway = new Gateway();

  try {
    if (!checkExistUser(userID)) {
      return {
        status: 401,
        error: "User identity does not exist in the wallet.",
      };
    }
    const ccp = appUtil.buildCCPOrg();
    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await buildWallet(Wallets, connectionMaterial.walletPath);
    await gateway.connect(ccp, {
      wallet,
      identity: userID,
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

const queryBlock = async (networkObj, ...funcAndArgs) => {
  try {
    console.log(`Query parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    let response = await networkObj.contract.evaluateTransaction(
      ...funcAndArgsStrings
    );
    response = BlockDecoder.decode(response);
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

const queryLeger = async (networkObj, ...funcAndArgs) => {
  try {
    console.log(`Query parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    const response = await networkObj.contract.evaluateTransaction(
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

const invoke = async (networkObj, ...funcAndArgs) => {
  try {
    console.log(`Invoke parameter: ${funcAndArgs}`);
    const funcAndArgsStrings = funcAndArgs.map((elem) => String(elem));
    console.log(funcAndArgsStrings);
    const response = await networkObj.contract.submitTransaction(
      ...funcAndArgsStrings
    );
    console.log(response);
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
    const caClient = caUtil.buildCAClient(
      pkg,
      ccp,
      `ca.${orgName}.scm.com`
    );

    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(Wallets, connectionMaterial.walletPath);

    await caUtil.enrollAdmin(caClient, wallet, connectionMaterial.orgMSP);
  } catch (err) {
    console.error(`Failed to enroll admin user: ${err}`);
    process.exit(1);
  }
};

const registerUser = async (orgName, userID) => {
  try {
    const ccp = appUtil.buildCCPOrg();
    const caClient = caUtil.buildCAClient(
      FabricCAServices,
      ccp,
      `ca.${orgName}.supplychain.com`
    );

    const connectionMaterial = getConnectionMaterial(orgName);
    const wallet = await appUtil.buildWallet(Wallets, connectionMaterial.walletPath);

    await caUtil.registerAndEnrollUser(
      caClient,
      wallet,
      connectionMaterial.orgMSP,
      userId,
      `${orgName}.department`
    );
  } catch (err) {
    console.error(`Failed to register user ${userID}: ${err}`);
    return { status: 500, error: err.toString() };
  }
};

const checkExistUser = async (userId) => {
  try {
    const userIdentity = await wallet.get(userId);
    if (!userIdentity) {
      console.error(
        `An identity for the user ${userID} does not exist in the wallet. Register ${userID} first`
      );
      contractRes;
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Failed: ${err}`);
    return { status: 500, error: err.toString() };
  }
};

const init = async () => {
  await enrollAdmin("farmer");
  await enrollAdmin("manufacturer");
  await enrollAdmin("distributor");
  await enrollAdmin("retailer");
};

export default {
  connect,
  queryBlock,
  queryLeger,
  invoke,
  enrollAdmin,
  registerUser,
  init,
};
