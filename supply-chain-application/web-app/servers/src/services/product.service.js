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
    if (!user) throw new Error("User not found");
    if (user.organization !== "manufacturer")
        throw new Error("Organization is not illegal");

    const product = new productModel(req.body);
    product.actors.manufacturer = user;
    product.hash_code = hash.hashData(product);
    await product.save();

    let rawIds = [];
    product.raws.map((raw) => rawIds.push(raw._id.toString()));

    await fabricManufacturer.createProduct(
        user._id,
        product._id,
        product.product_name,
        product.price,
        rawIds.toLocaleString(),
        product.status,
        product.description,
        product.timestamps.created_date,
        product.hash_code
    );

    return "Create a new product successfully";
};

const updateProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    if (user.organization !== "manufacturer")
        throw new Error("Organization is not illegal");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");
    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    product.product_name = req.body.product_name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.raws = req.body.raws;
    product.status = "UPDATED";
    product.hash_code = hash.hashData(product);
    await product.save();

    let rawIds = [];
    product.raws.map((raw) => rawIds.push(raw._id.toString()));

    await fabricManufacturer.updateProduct(
        user._id,
        product._id,
        product.product_name,
        product.price,
        rawIds.toLocaleString(),
        product.status,
        product.description,
        product.hash_code
    );

    return "Update a product successfully";
};

const orderProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    if (user.organization !== "retailer")
        throw new Error("Organization is not illegal");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");
    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    product.actors.retailer = user;
    product.timestamps.ordered_date = Date.now();
    product.status = "ORDERED";
    product.hash_code = hash.hashData(product);
    await product.save();

    await fabricRetailer.orderProduct(
        user._id,
        product._id,
        product.timestamps.ordered_date,
        product.status,
        product.hash_code
    );

    return "Order a product successfully";
};

const provideProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    if (user.organization !== "manufacturer")
        throw new Error("Organization is not illegal");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");
    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    product.actors.distributor = req.body.distributor;
    product.status = "DELIVERING";
    await product.save();

    await fabricManufacturer.provideProduct(
        user._id,
        product._id,
        product.actors.distributor._id,
        product.status,
        product.hash_code
    );
    return "Provide a product successfully";
};

const deliveryProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    if (user.organization !== "distributor")
        throw new Error("Organization is not illegal");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");
    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    product.timestamps.delivered_date = Date.now();
    await product.save();

    await fabricDistributor.deliveryProduct(
        user._id,
        product._id,
        product.timestamps.delivered_date,
        product.status,
        product.hash_code
    );

    return "Delivery a product successfully";
};

const receiveProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    if (user.organization !== "retailer")
        throw new Error("Organization is not illegal");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");
    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    product.timestamps.received_date = Date.now();
    product.status = "RECEIVED";
    await product.save();

    await fabricRetailer.receiveProduct(
        user._id,
        product._id,
        product.timestamps.received_date,
        product.status,
        product.hash_code
    );

    return "Receive a product successfully";
};

const sellProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    if (user.organization !== "retailer")
        throw new Error("Organization is not illegal");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");
    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    product.timestamps.sold_date = Date.now();
    product.status = "SOLD";
    await product.save();

    await fabricRetailer.sellProduct(
        user._id,
        product._id,
        product.timestamps.sold_date,
        product.status,
        product.hash_code
    );

    return "Sell a product successfully";
};

const verifyProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");
    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    const productFabric = await fabricUtil.getProduct(
        user.organization,
        user._id,
        product._id
    );

    return JSON.parse(productFabric).HashCode === product.hash_code;
};

const getProduct = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");

    const product = await productModel
        .findById(productId)
        .populate("actors.manufacturer", options)
        .populate("actors.distributor", options)
        .populate("actors.retailer", options)
        .populate("raws");

    if (!product) throw new Error("Product not found");

    return product;
};

const getProducts = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");
    if (user.organization === "supplier")
        throw new Error("Organization is not illegal");

    if (user.organization === "manufacturer")
        return await productModel.find({}).populate("actors.manufacturer", {
            _id: user._id,
        });

    if (user.organization === "distributor")
        return await productModel.find({}).populate("actors.distributor", {
            _id: user._id,
        });

    return await productModel.find();
};

const getProductHistories = async (req) => {
    const user = req.user;
    if (!user) throw new Error("User not found");

    const productId = req.params.productId;
    if (!productId) throw new Error("Missing productId");

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
