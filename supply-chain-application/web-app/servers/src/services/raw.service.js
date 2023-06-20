"use strict";

import fabricSupplier from "../fabric/supplier.fabric.js";
import fabricManufacturer from "../fabric/manufacturer.fabric.js";
import fabricUtil from "../fabric/util.fabric.js";
import rawModel from "../models/raw.model.js";
import hash from "../utils/hash.js";

const options = ["_id", "email", "username", "address", "organization"];

const createRaw = async (req) => {
    const user = req.user;
    if (!user) return {message:"User not found"};
    if (user.organization !== "supplier") return {message:"Organization is not illegal"};

    const raw = new rawModel(req.body);
    raw.supplier = user;
    raw.hash_code = hash.hashData(raw);
    await raw.save();

    // await fabricSupplier.createRaw(
    //     user._id,
    //     raw._id,
    //     raw.raw_name,
    //     raw.created_date,
    //     raw.status,
    //     raw.hash_code
    // );

    return "Create a new raw successfully";
};

const updateRaw = async (req) => {
    const user = req.user;
    if (!user) return {message:"User not found"};
    if (user.organization !== "supplier") return {message:"Organization is not illegal"};

    const rawId = req.params.rawId;
    if (!rawId) return {message:"Missing rawId"};
    const raw = await rawModel.findById(rawId);
    if (!raw) return {message:"Raw not found"};
    if (raw.status === "ORDERED" || raw.status === "SUPPLIED")
        return {message:"Can not edit this raw"};

    raw.raw_name = req.body.raw_name;
    raw.status = "UPDATED";
    raw.hash_code = hash.hashData(raw);
    await raw.save();

    // await fabricSupplier.updateRaw(
    //     user._id,
    //     raw._id,
    //     raw.raw_name,
    //     raw.status,
    //     raw.hash_code
    // );

    return "Update a raw successfully";
};

const orderRaw = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "manufacturer")
        return {message:"Organization is not illegal"};

    const rawId = req.params.rawId;
    if (!rawId) return {message:"Missing rawId"};
    const raw = await rawModel.findById(rawId);
    if (!raw) return {message:"Raw not found"};
    if (raw.status !== "CREATED" && raw.status !== "UPDATED")
        return {message:"Can not order this raw"};

    raw.manufacturer = user;
    raw.status = "ORDERED";
    raw.hash_code = hash.hashData(raw);
    await raw.save();

    // await fabricManufacturer.orderRaw(
    //     user._id,
    //     raw._id,
    //     raw.status,
    //     raw.hash_code
    // );

    return "Order this raw successfully";
};

const supplyRaw = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "supplier") return {message:"Organization is not illegal"};

    const rawId = req.params.rawId;
    if (!rawId) return {message:"Missing rawId"};
    const raw = await rawModel.findById(rawId);
    if (!raw) return {message:"Raw not found"};
    if (raw.status !== "ORDERED") return {message:"Can not supply this raw"};

    raw.supplied_date = Date.now();
    raw.status = "SUPPLIED";
    raw.hash_code = hash.hashData(raw);
    await raw.save();

    // await fabricSupplier.supplyRaw(
    //     user._id,
    //     raw._id,
    //     raw.supplied_date,
    //     raw.status,
    //     raw.hash_code
    // );

    return "Supplier this raw successfully";
};

const verifyRaw = async (req) => {
    const user = req.user;
    if (!user) return {message:"User not found"};
    const rawId = req.params.rawId;
    if (!rawId) return {message:"Missing rawId"};
    const raw = await rawModel.findById(rawId);
    if (!raw) return {message:"Raw not found"};

    // const rawFabric = await fabricUtil.getRaw(
    //     user.organization,
    //     user._id,
    //     raw._id
    // );

    return JSON.parse(rawFabric).HashCode === raw.hash_code;
};

const getRaw = async (req) => {
    const user = req.user;
    if (!user) return {message:"User not found"};
    const rawId = req.params.rawId;
    if (!rawId) return {message:"Missing rawId"};

    const raw = await rawModel
        .findById(rawId)
        .populate("supplier", options)
        .populate("manufacturer", options);
    if (!raw) return {message:"Raw not found"};

    return raw;
};

const getRaws = async (req) => {
    const user = req.user;
    if (!user) return {message:"User not found"};

    if (user.organization === "manufacturer")
        return await rawModel
            .find()
            .populate("supplier", options)
            .populate("manufacturer", options);

    if (user.organization === "supplier")
        return await rawModel
            .find({ supplier: user._id })
            .populate("supplier", options)
            .populate("manufacturer", options);
    else return [];
};

const getRawHistories = async (req) => {
    const user = req.user;
    if (!user) return {message:"User not found"};
    const rawId = req.params.rawId;
    if (!rawId) return {message:"Missing rawId"};

    const rawFabric = await fabricUtil.getRawHistories(
        user.organization,
        user._id,
        rawId
    );

    return JSON.parse(rawFabric);
};

export default {
    createRaw,
    updateRaw,
    orderRaw,
    supplyRaw,
    verifyRaw,
    getRaw,
    getRaws,
    getRawHistories,
};
