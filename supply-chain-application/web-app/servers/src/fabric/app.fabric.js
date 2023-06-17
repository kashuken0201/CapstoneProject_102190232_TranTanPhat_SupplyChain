"use strict";

import fs from "fs";
import path from "path";
import { logger } from "../utils/logger.js";

const __dirname = path.resolve();

const buildCCPOrg = (orgName) => {
    // load the common connection configuration file
    const ccpPath = path.resolve(
        __dirname,
        "..",
        "servers/src/connections",
        `connection-${orgName}.json`
    );
    const fileExists = fs.existsSync(ccpPath);
    if (!fileExists) {
        throw new Error(`no such file or directory: ${ccpPath}`);
    }
    const contents = fs.readFileSync(ccpPath, "utf8");

    // build a JSON object from the file contents
    const ccp = JSON.parse(contents);

    logger.info(`Loaded the network configuration located at ${ccpPath}`);
    return ccp;
};

const buildWallet = async (Wallets, walletPath) => {
    // Create a new  wallet : Note that wallet is for managing identities.
    let wallet;
    if (walletPath) {
        wallet = await Wallets.newFileSystemWallet(walletPath);
        logger.info(`Built a file system wallet at ${walletPath}`);
    } else {
        wallet = await Wallets.newInMemoryWallet();
        logger.info("Built an in memory wallet");
    }

    return wallet;
};

const prettyJSONString = (inputString) => {
    if (inputString) {
        return JSON.stringify(JSON.parse(inputString));
    } else {
        return inputString;
    }
};

export default {
    buildCCPOrg,
    buildWallet,
    prettyJSONString,
};
