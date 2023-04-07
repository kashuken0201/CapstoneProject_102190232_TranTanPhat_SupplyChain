"use strict";

import network from './network.model';
import appUtil from "../utils/appUtil";

const signup = async (orgName, params) => {
    try {
        const { username, password, email, userType, address } = params;

        const networkObj = await network.connect(orgName, 'admin', 'fsc');
        const res = await networkObj.contract.submitTransaction('CreateUser', username, email, userType, address, password);
        res = appUtil.prettyJSONString(res);
        await network.registerUser(orgName, res.UserID);

        return {
            data: res,
            key: 'signup',
        };
    } catch (err) {

    }

};

const signin = async (orgName, params) => {
    const { email, password, userType } = params;

    const networkObj = await network.connect(orgName, 'admin', 'fsc');
    const res = await networkObj.contract.evaluateTransaction('SignIn', email, password);
    res = appUtil.prettyJSONString(res);

    if (res.Role === 'admin') {
        res.UserType = isManufacturer ? 'manufacturer' : 'consumer'
        return {
            data: contractRes,
            key: 'signin',
        };
    } else {
        contractRes = await networkObj.contract.evaluateTransaction('signIn', 'User', username, password);
        contractRes.forEach(element => {
            if (element.Record.Name === username && element.Record.Password === password && element.Record.UserType === userType) {
                contractRes = element.Record
            }
        });
        if (contractRes !== null)
            return {
                data: contractRes,
                key: 'signin',
            };
        return {
            data: 'Not exist, failed to login',
            key: 'signin',
        };
    }
};

const getAllUser = async (isManufacturer, isConsumer) => {
    const networkObj = await network.connect(isManufacturer, isConsumer, 'admin', 'supply');
    const contractRes = await network.query(networkObj, 'queryAll', 'User');
    const res = [];
    contractRes.forEach(element => {
        res.push(element.Record)
    });
    return {
        data: res,
        key: 'getAllUser',
    };
};

export default {
    signin,
    signup,
    getAllUser
}