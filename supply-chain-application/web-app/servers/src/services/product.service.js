"use strict";

import fabricManufacturer from "../fabric/manufacturer.fabric.js";
import fabricDistributor from "../fabric/distributor.fabric.js";
import fabricRetailer from "../fabric/retailer.fabric.js";
import fabricUtil from "../fabric/util.fabric.js";
import productModel from "../models/product.model.js";

const options = ["_id", "email", "username", "address", "organization"];

const createProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "manufacturer")
        return "Organization is not illegal";
    const product = new productModel(req.body);
    product.actors.manufacturer = user;
    await product.save();
    return "Create a new product successfully";
    // await fabricManufacturer.createProduct(params.manufacturerId, body.productName, body.price, body.description, body.rawIds)
};

const updateProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "manufacturer")
        return "Organization is not illegal";
    const productId = req.params.productId;
    if (!productId) return "Missing productId";
    const product = await productModel.findById(productId);
    if (!product) return "Product not found";
    product.product_name = req.body.product_name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.raws = req.body.raws;
    product.status = "UPDATED";
    await product.save();
    return "Update a product successfully";
    // await fabricManufacturer.updateProduct(params.manufacturerId, body.productId, body.productName, body.price, body.description, body.rawIds)
};

const getProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    const productId = req.params.productId;
    if (!productId) return "Missing productId";
    const product = await productModel
        .findById(productId)
        .populate("actors.manufacturer", options)
        .populate("actors.distributor", options)
        .populate("actors.retailer", options)
        .populate("raws");
    return product;
    // const productFabric = await fabricUtil.getProduct(params.orgName, params.userId, params.productId)
    // return productFabric
};

const getProducts = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization === "supplier") return "Organization is not illegal";
    if (user.organization === "manufacturer")
        return await productModel.find({ actors: { manufacturer: user._id } });
    if (user.organization === "distributor")
        return await productModel.find({ actors: { distributor: user._id } });
    return await productModel.find();
    // const productFabric = await fabricUtil.getProducts(params.orgName, params.userId)
    // return productFabric
};

const provideProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "manufacturer")
        return "Organization is not illegal";
    const productId = req.params.productId;
    if (!productId) return "Missing productId";
    const product = await productModel.findById(productId);
    if (!product) return "Product not found";
    product.actors.distributor = req.body.distributor;
    product.status = "DELIVERING";
    await product.save();
    return "Provide a product successfully";
    // await fabricManufacturer.provideProduct(params.manufacturerId, body.productId, body.retailerId, body.distributorId)
};

const orderProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "retailer") return "Organization is not illegal";
    const productId = req.params.productId;
    if (!productId) return "Missing productId";
    const product = await productModel.findById(productId);
    if (!product) return "Product not found";
    product.actors.retailer = user;
    product.timestamps.ordered_date = Date.now();
    product.status = "ORDERED";
    await product.save();
    return "Order a product successfully";
    // await fabricRetailer.orderProduct(params.retailerId, body.productId, body.manufacturerId)
};

const receiveProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "retailer") return "Organization is not illegal";
    const productId = req.params.productId;
    if (!productId) return "Missing productId";
    const product = await productModel.findById(productId);
    if (!product) return "Product not found";
    product.timestamps.received_date = Date.now();
    product.status = "RECEIVED";
    await product.save();
    return "Receive a product successfully";
    // await fabricRetailer.receiveProduct(params.retailerId, body.productId, body.manufacturerId, body.distributorId)
};

const sellProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "retailer") return "Organization is not illegal";
    const productId = req.params.productId;
    if (!productId) return "Missing productId";
    const product = await productModel.findById(productId);
    if (!product) return "Product not found";
    product.timestamps.sold_date = Date.now();
    product.status = "SOLD";
    await product.save();
    return "Sell a product successfully";
    // await fabricRetailer.sellProduct(params.retailerId, body.productId)
};

const deliveryProduct = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "distributor") return "Organization is not illegal";
    const productId = req.params.productId;
    if (!productId) return "Missing productId";
    const product = await productModel.findById(productId);
    if (!product) return "Product not found";
    product.timestamps.delivered_date = Date.now();
    await product.save();
    return "Delivery a product successfully";
    // await fabricDistributor.deliveryProduct(params.distributorId, body.productId, body.manufacturerId, body.retailerId)
};

const getProductHistories = async (req) => {
    // const productFabric = await fabricUtil.getProductHistories(params.orgName, params.userId, params.productId)
    // return productFabric
};

export default {
    createProduct,
    updateProduct,
    getProduct,
    getProducts,
    provideProduct,
    orderProduct,
    receiveProduct,
    sellProduct,
    deliveryProduct,
    getProductHistories,
};
