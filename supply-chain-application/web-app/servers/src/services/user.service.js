"use strict";

import fabricAdmin from "../fabric/admin.fabric.js";
import userModel from "../models/user.model.js";
import rawModel from "../models/raw.model.js";
import productModel from "../models/product.model.js";

const signUp = async (req) => {
    const user = new userModel(req.body);
    await user.save();

    // await fabricAdmin.registerUser(user.organization, user._id);

    return "Sign up successfully";
};

const signIn = async (req) => {
    const { email, password, organization } = req.body;
    const user = await userModel.findByCredentials(
        email,
        password,
        organization
    );

    if (!user)
        return { error: "Login failed! Check authentication credentials" };

    const token = await user.generateAuthToken();
    user.password = "";
    return { user, token };
};

const infoUser = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
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
    if (!userId) return { message: "Missing userId" };
    const user = await userModel.findById(userId);
    if (!user) return { message: "User not found" };
    user.password = "";
    return user;
};

const getUsers = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };

    const organization = req.params.organization;
    const users = await userModel.find({ organization: organization });
    return users;
};

const getDashboard = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };

    const raw = (await rawModel.find()).length;

    const total_price = await productModel.find().then((products) => {
        let price = 0;
        products.forEach((product) => {
            price = price + product.price;
        });

        return price;
    });

    const manufacturing_product = (
        await productModel.find({
            $or: [{ status: "CREATED" }, { status: "UPDATED" }],
        })
    ).length;
    const delivering_product = (
        await productModel.find({ status: "DELIVERING" })
    ).length;

    const sold_product = (await productModel.find({ status: "SOLD" })).length;

    const supplier_active_user = (
        await userModel.find({ status: "ACTIVE", organization: "supplier" })
    ).length;
    const supplier_deactive_user = (
        await userModel.find({ status: "DEACTIVE", organization: "supplier" })
    ).length;

    const manufacturer_active_user = (
        await userModel.find({ status: "ACTIVE", organization: "manufacturer" })
    ).length;

    const manufacturer_deactive_user = (
        await userModel.find({
            status: "DEACTIVE",
            organization: "manufacturer",
        })
    ).length;

    const distributor_active_user = (
        await userModel.find({ status: "ACTIVE", organization: "distributor" })
    ).length;

    const distributor_deactive_user = (
        await userModel.find({ status: "DEACTIVE", organization: "distributor" })
    ).length;

    const retailer_active_user = (
        await userModel.find({ status: "ACTIVE", organization: "retailer" })
    ).length;

    const retailer_deactive_user = (
        await userModel.find({ status: "DEACTIVE", organization: "retailer" })
    ).length;

    return {
        raw: raw,
        manufacturing_product: manufacturing_product,
        delivering_product: delivering_product,
        sold_product: sold_product,
        total: manufacturing_product + delivering_product + sold_product,
        total_price: total_price,
        supplier_active_user: supplier_active_user,
        supplier_deactive_user: supplier_deactive_user,
        manufacturer_active_user: manufacturer_active_user,
        manufacturer_deactive_user: manufacturer_deactive_user,
        distributor_active_user: distributor_active_user,
        distributor_deactive_user: distributor_deactive_user,
        retailer_active_user: retailer_active_user,
        retailer_deactive_user: retailer_deactive_user,
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
    // await fabricAdmin.enrollAdmin(user.organization, "admin"};
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
