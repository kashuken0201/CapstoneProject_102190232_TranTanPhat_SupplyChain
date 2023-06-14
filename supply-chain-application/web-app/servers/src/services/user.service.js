"use strict";

import fabricAdmin from "../fabric/admin.fabric.js";
import fabricUtil from "../fabric/util.fabric.js";
import userModel from "../models/user.model.js";
import rawModel from "../models/raw.model.js";
import productModel from "../models/product.model.js";

const signIn = async (req) => {
    const { email, password } = req.body;
    const user = await userModel.findByCredentials(email, password);
    if (!user) {
        return { error: "Login failed! Check authentication credentials" };
    }
    const token = await user.generateAuthToken();
    return { user, token };
    // return await fabricAdmin.signIn(params.orgName, "User1", body.email, body.password)
};

const infoUser = async (req) => {
    const { email, password } = req.body;
    const user = await userModel.findByCredentials(email, password);
    if (!user) {
        return { error: "Login failed! Check authentication credentials" };
    }
    return { user };
    // return await fabricAdmin.signIn(params.orgName, "User1", body.email, body.password)
};

const signUp = async (req) => {
    const user = new userModel(req.body);
    await user.save();
    await user.generateAuthToken();
    return { user };
    // await fabricAdmin.signUp(params.orgName, body.adminId, body.email, body.password, body.username, body.address, body.role)
};

const logOut = async (req) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
    });
    await req.user.save();
    // return await fabricAdmin.signIn(params.orgName, "User1", body.email, body.password)
};

const changeInfoUser = async (params, body) => {
    await fabricAdmin.changeInfoUser(
        params.orgName,
        params.userId,
        body.adminId,
        body.password,
        body.username,
        body.address,
        body.status
    );
};

const getUser = async (req) => {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    return user;
    // const userFabric = await fabricUtil.getUser(params.orgName, params.userId);
    // return userFabric;
};

const getUsers = async (req) => {
    const organization = req.params.organization;
    const users = await userModel.find({ organization: organization });
    return users;
    // const userFabric = await fabricUtil.getUsers(
    //     params.orgName,
    //     params.adminId
    // );
    // return userFabric;
};

const getDashboard = async (req) => {
    const organization = req.params.organization;
    const users = await userModel.find({ organization: organization });
    return users;
    // const userFabric = await fabricUtil.getUsers(
    //     params.orgName,
    //     params.adminId
    // );
    // return userFabric;
};

const createAdmin = async (
    username,
    email,
    password,
    address,
    organization
) => {
    const admin = {
        username: username,
        email: email,
        password: password,
        address: address,
        organization: organization,
        role: "admin",
    };
    const user = new userModel(admin);
    await user.save();
    await user.generateAuthToken();
    await fabricAdmin.enrollAdmin(user.organization, "admin");
};

const importAdmin = async () => {
    await createAdmin(
        "Supplier Admin",
        "supplier@gmail.com",
        "admin123567",
        "VIE",
        "supplier"
    );
    await createAdmin(
        "Manufacturer Admin",
        "manufacturer@gmail.com",
        "admin123567",
        "VIE",
        "manufacturer"
    );
    await createAdmin(
        "Distributor Admin",
        "distributor@gmail.com",
        "admin123567",
        "VIE",
        "distributor"
    );
    await createAdmin(
        "Retailer Admin",
        "retailer@gmail.com",
        "admin123567",
        "VIE",
        "retailer"
    );
};

export default {
    getUsers,
    getUser,
    signIn,
    signUp,
    infoUser,
    logOut,
    changeInfoUser,
    getDashboard,
    importAdmin,
};
