"use strict";

import fabricSupplier from "../fabric/supplier.fabric.js";
import fabricManufacturer from "../fabric/manufacturer.fabric.js";
import fabricUtil from "../fabric/util.fabric.js";
import rawModel from "../models/raw.model.js";
import userModel from "../models/user.model.js";

const options = ["_id", "email", "username", "address", "organization"];

const createRaw = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "supplier") return "Organization is not illegal";
    const raw = new rawModel(req.body);
    raw.supplier = user;
    await raw.save();
    return "Create a new raw successfully";
    // await fabricSupplier.createRaw(params.supplierId, body.rawName)
};

const updateRaw = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "supplier") return "Organization is not illegal";
    const rawId = req.params.rawId;
    if (!rawId) return "Missing rawId";
    const raw = await rawModel.findById(rawId);
    if (!raw) return "Raw not found";
    raw.raw_name = req.body.raw_name;
    await raw.save();
    return "Update a raw successfully";
    // await fabricSupplier.updateRaw(params.supplierId, body.rawId, body.rawName)
};

const getRaw = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    const rawId = req.params.rawId;
    if (!rawId) return "Missing rawId";
    const raw = await rawModel
        .findById(rawId)
        .populate("supplier", options)
        .populate("manufacturer", options);
    if (!raw) return "Raw not found";
    return raw;
    // const rawFabric = await fabricUtil.getRaw(params.orgName, params.userId, params.rawId)
    // return rawFabric
};

const getRaws = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
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
    return "Organization is not illegal";
    // const rawFabric = await fabricUtil.getRaws(params.orgName, params.userId)
    // return rawFabric
};

const getRawHistories = async (params) => {
    // const rawFabric = await fabricUtil.getRawHistories(params.orgName, params.userId, params.rawId)
    // return rawFabric
};

const supplyRaw = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "supplier") return "Organization is not illegal";
    const rawId = req.params.rawId;
    if (!rawId) return "Missing rawId";
    const raw = await rawModel.findById(rawId);
    if (!raw) return "Raw not found";
    raw.suppliedDate = Date.now();
    await raw.save();
    return "Supplier this raw successfully";
    // await fabricSupplier.supplyRaw(params.supplierId, body.rawId, body.manufacturerId)
};

const orderRaw = async (req) => {
    const user = req.user;
    if (!user) return "User not found";
    if (user.organization !== "manufacturer")
        return "Organization is not illegal";
    const rawId = req.params.rawId;
    if (!rawId) return "Missing rawId";
    const raw = await rawModel.findById(rawId);
    if (!raw) return "Raw not found";
    raw.manufacturer = user;
    await raw.save();
    return "Order this raw successfully";
    // await fabricManufacturer.orderRaw(params.manufacturerId, body.rawId, body.supplierId)
};

export default {
    createRaw,
    updateRaw,
    getRaw,
    getRaws,
    getRawHistories,
    supplyRaw,
    orderRaw,
};
