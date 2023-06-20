"use strict";

import fabricManufacturer from "../fabric/manufacturer.fabric.js";
import fabricDistributor from "../fabric/distributor.fabric.js";
import fabricRetailer from "../fabric/retailer.fabric.js";
import fabricUtil from "../fabric/util.fabric.js";
import productModel from "../models/product.model.js";
import hash from "../utils/hash.js";

const options = ["_id", "email", "username", "address", "organization"];

const createProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization !== "manufacturer")
        return { message: "Organization is not illegal" };

    const product = new productModel(req.body.product);
    product.actors.manufacturer = user;
    product.hash_code = hash.hashData(product);
    await product.save();

    let rawIds = [];
    product.raws.map((raw) => rawIds.push(raw._id.toString()));

    // await fabricManufacturer.createProduct(
    //     user._id,
    //     product._id,
    //     product.product_name,
    //     product.price,
    //     rawIds.toLocaleString(),
    //     product.status,
    //     product.description,
    //     product.timestamps.created_date,
    //     product.hash_code
    // );

    return "Create a new product successfully";
};

const updateProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization !== "manufacturer")
        return { message: "Organization is not illegal" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };
    const product = await productModel.findById(productId);
    if (!product) return { message: "Product not found" };
    if (product.status !== "CREATED" || product.status !== "UPDATED") return { message: "Product cannot be updated" };

    product.product_name = req.body.product.product_name;
    product.price = req.body.product.price;
    product.description = req.body.product.description;
    product.raws = req.body.product.raws;
    product.status = "UPDATED";
    product.hash_code = hash.hashData(product);
    await product.save();

    let rawIds = [];
    product.raws.map((raw) => rawIds.push(raw._id.toString()));

    // await fabricManufacturer.updateProduct(
    //     user._id,
    //     product._id,
    //     product.product_name,
    //     product.price,
    //     rawIds.toLocaleString(),
    //     product.status,
    //     product.description,
    //     product.hash_code
    // );

    return "Update a product successfully";
};

const orderProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization !== "retailer")
        return { message: "Organization is not illegal" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };
    const product = await productModel.findById(productId);
    if (!product) return { message: "Product not found" };
    if (product.status !== "CREATED" && product.status !== "UPDATED") return { message: "Product cannot be ordered" };

    product.actors.retailer = user;
    product.timestamps.ordered_date = Date.now();
    product.status = "ORDERED";
    product.hash_code = hash.hashData(product);
    await product.save();

    // await fabricRetailer.orderProduct(
    //     user._id,
    //     product._id,
    //     product.timestamps.ordered_date,
    //     product.status,
    //     product.hash_code
    // );

    return "Order a product successfully";
};

const provideProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization !== "manufacturer")
        return { message: "Organization is not illegal" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };
    const product = await productModel.findById(productId);
    if (!product) return { message: "Product not found" };
    if (product.status !== "ORDERED") return { message: "Product cannot be provided" };

    product.actors.distributor = req.body.distributor;
    product.status = "DELIVERING";
    await product.save();

    // await fabricManufacturer.provideProduct(
    //     user._id,
    //     product._id,
    //     product.actors.distributor._id,
    //     product.status,
    //     product.hash_code
    // );

    return "Provide a product successfully";
};

const deliveryProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization !== "distributor")
        return { message: "Organization is not illegal" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };
    const product = await productModel.findById(productId);
    if (!product) return { message: "Product not found" };
    if (product.actors.distributor) return { message: "Product cannot be delivered" };

    product.timestamps.delivered_date = Date.now();
    await product.save();

    // await fabricDistributor.deliveryProduct(
    //     user._id,
    //     product._id,
    //     product.timestamps.delivered_date,
    //     product.status,
    //     product.hash_code
    // );

    return "Delivery a product successfully";
};

const receiveProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization !== "retailer")
        return { message: "Organization is not illegal" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };
    const product = await productModel.findById(productId);
    if (!product) return { message: "Product not found" };
    if (!product.actors.distributor || product.status !== "DELIVERING") return { message: "Product cannot be received" };

    product.timestamps.received_date = Date.now();
    product.status = "RECEIVED";
    await product.save();

    // await fabricRetailer.receiveProduct(
    //     user._id,
    //     product._id,
    //     product.timestamps.received_date,
    //     product.status,
    //     product.hash_code
    // );

    return "Receive a product successfully";
};

const sellProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization !== "retailer")
        return { message: "Organization is not illegal" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };
    const product = await productModel.findById(productId);
    if (!product) return { message: "Product not found" };
    if (product.status !== "RECEIVED") return { message: "Product cannot be sold" };

    product.timestamps.sold_date = Date.now();
    product.status = "SOLD";
    await product.save();

    // await fabricRetailer.sellProduct(
    //     user._id,
    //     product._id,
    //     product.timestamps.sold_date,
    //     product.status,
    //     product.hash_code
    // );

    return "Sell a product successfully";
};

const verifyProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };
    const product = await productModel.findById(productId);
    if (!product) return { message: "Product not found" };

    // const productFabric = await fabricUtil.getProduct(
    //     user.organization,
    //     user._id,
    //     product._id
    // );

    return JSON.parse(productFabric).HashCode === product.hash_code;
};

const getProduct = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };

    const product = await productModel
        .findById(productId)
        .populate("actors.manufacturer", options)
        .populate("actors.distributor", options)
        .populate("actors.retailer", options)
        .populate("raws");

    if (!product) return { message: "Product not found" };

    return product;
};

const getProducts = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };
    if (user.organization === "supplier")
        return { message: "Organization is not illegal" };

    if (user.role === "admin" || user.organization === "retailer")
        return await productModel
            .find()
            .populate({
                path: "actors.manufacturer",
                select: options,
            })
            .populate({
                path: "actors.distributor",
                select: options,
            })
            .populate({
                path: "actors.retailer",
                select: options,
            })
            .populate({
                path: "raws",
                populate: {
                    path: "manufacturer",
                    select: options,
                },
                populate: {
                    path: "supplier",
                    select: options,
                },
            });

    if (user.organization === "manufacturer") {
        let res = [];
        await productModel
            .find()
            .populate({
                path: "actors.manufacturer",
                select: options,
            })
            .populate({
                path: "actors.distributor",
                select: options,
            })
            .populate({
                path: "actors.retailer",
                select: options,
            })
            .populate({
                path: "raws",
                populate: {
                    path: "manufacturer",
                    select: options,
                },
                populate: {
                    path: "supplier",
                    select: options,
                },
            })
            .then((products) => {
                products.forEach((product) => {
                    if (
                        product.actors.manufacturer?._id.toString() ===
                        user._id.toString()
                    ) {
                        res.push(product);
                    }
                });
            });
        return res;
    }

    if (user.organization === "distributor") {
        let res = [];
        await productModel
            .find({})
            .populate({
                path: "actors.manufacturer",
                select: options,
            })
            .populate({
                path: "actors.distributor",
                select: options,
            })
            .populate({
                path: "actors.retailer",
                select: options,
            })
            .populate({
                path: "raws",
                populate: {
                    path: "manufacturer",
                    select: options,
                },
                populate: {
                    path: "supplier",
                    select: options,
                },
            })
            .then((products) => {
                products.forEach((product) => {
                    if (
                        product.actors.distributor?._id.toString() ===
                        user._id.toString()
                    ) {
                        res.push(product);
                    }
                });
            });
        return res;
    }

    return [];
};

const getProductHistories = async (req) => {
    const user = req.user;
    if (!user) return { message: "User not found" };

    const productId = req.params.productId;
    if (!productId) return { message: "Missing productId" };

    const productFabric = await fabricUtil.getProductHistories(
        user.organization,
        user._id,
        productId
    );

    return JSON.parse(productFabric);
};

export default {
    createProduct,
    updateProduct,
    orderProduct,
    provideProduct,
    deliveryProduct,
    receiveProduct,
    sellProduct,
    verifyProduct,
    getProduct,
    getProducts,
    getProductHistories,
};
