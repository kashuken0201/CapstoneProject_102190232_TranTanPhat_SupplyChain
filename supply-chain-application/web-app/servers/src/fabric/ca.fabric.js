"use strict";

import { logger } from "../utils/logger.js";

const adminUserId = process.env.ADMIN;
const adminUserPasswd = process.env.ADMIN_SECRET;

const buildCAClient = (FabricCAServices, ccp, caHostName) => {
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities[caHostName]; //lookup CA details from config
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const caClient = new FabricCAServices(
        caInfo.url,
        { trustedRoots: caTLSCACerts, verify: false },
        caInfo.caName
    );

    logger.info(`Built a CA Client named ${caInfo.caName}`);
    return caClient;
};

const enrollAdmin = async (caClient, wallet, orgMspId, adminId) => {
    try {
        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(adminId);
        if (identity) {
            logger.info(
                "An identity for the admin user already exists in the wallet"
            );
            return;
        }
        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await caClient.enroll({
            enrollmentID: adminUserId,
            enrollmentSecret: adminUserPasswd,
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: "X.509",
        };

        await wallet.put(adminId, x509Identity);
        logger.info(
            "Successfully enrolled admin user and imported it into the wallet"
        );
    } catch (error) {
        throw new Error(`Failed to enroll admin user : ${error}`);
    }
};

const registerAndEnrollUser = async (
    caClient,
    wallet,
    orgMspId,
    userId,
    adminId,
    affiliation
) => {
    try {
        // Check to see if we've already enrolled the user
        const userIdentity = await wallet.get(userId);
        if (userIdentity) {
            logger.info(
                `An identity for the user ${userId} already exists in the wallet`
            );
            return;
        }

        // Must use an admin to register a new user
        const adminIdentity = await wallet.get(adminId);
        if (!adminIdentity) {
            logger.info(
                "An identity for the admin user does not exist in the wallet"
            );
            logger.info("Enroll the admin user before retrying");
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet
            .getProviderRegistry()
            .getProvider(adminIdentity.type);

        const adminUser = await provider.getUserContext(adminIdentity, adminId);
        // Register the user, enroll the user, and import the new identity into the wallet.
        // if affiliation is specified by client, the affiliation value must be configured in CA
        const secret = await caClient.register(
            {
                affiliation: affiliation,
                enrollmentID: userId,
                role: "client",
            },
            adminUser
        );
        const enrollment = await caClient.enroll({
            enrollmentID: userId,
            enrollmentSecret: secret,
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: "X.509",
        };
        await wallet.put(userId, x509Identity);
        logger.info(
            `Successfully registered and enrolled user ${userId} and imported it into the wallet`
        );
    } catch (error) {
        throw new Error(`Failed to register user : ${error}`);
    }
};

export default {
    buildCAClient,
    enrollAdmin,
    registerAndEnrollUser,
};
