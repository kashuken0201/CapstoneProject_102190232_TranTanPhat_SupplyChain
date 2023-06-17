"use strict";

import fabricAdmin from "../fabric/admin.fabric.js";
import fabricUtil from "../fabric/util.fabric.js";
import userModel from "../models/user.model.js";
import rawModel from "../models/raw.model.js";
import productModel from "../models/product.model.js";

const signUp = async (req) => {
    const user = new userModel(req.body);
    await user.save();

    await fabricAdmin.registerUser(user.organization, user._id);

    return "Sign up successfully";
};

const signIn = async (req) => {
    const { email, password } = req.body;
    const user = await userModel.findByCredentials(email, password);

    if (!user) {
        return { error: "Login failed! Check authentication credentials" };
    }

    const token = await user.generateAuthToken();

    return { token };
};

const infoUser = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    user.password = "";
    return { user };
};

const logOut = async (req) => {
    const user = await userModel.findById(req.user._id);
    user.token = "";
    await user.save();
    return "Logged out";
};

const changeInfoUser = async (req) => {};

const getUser = async (req) => {
    const userId = req.params.userId;
    if (!userId) throw new Error("Missing userId");
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");
    user.password = "";
    return user;
};

const getUsers = async (req) => {
    const organization = req.params.organization;
    const users = await userModel.find({ organization: organization });
    return users;
};

const getDashboard = async (req) => {
    const raws = await rawModel.find();
    const products = await productsModel.find();
    const users = await userModel.find();
    return {
        raws: raws,
        products: products,
        users: users,
    };
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
