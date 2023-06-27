"use strict";

import fabricSupplier from "../fabric/supplier.fabric.js";
import fabricManufacturer from "../fabric/manufacturer.fabric.js";
import fabricUtil from "../fabric/util.fabric.js";
import rawModel from "../models/raw.model.js";
import hash from "../utils/hash.js";

const options = ["_id", "email", "username", "address", "organization"];

const createRaw = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };
    if (user?.organization !== "supplier")
        return { error: "Organization is not illegal" };

    const raw = new rawModel(req.body);
    raw.supplier = user;
    raw.hash_code = await hash.hashData(raw);
    await raw.save();

    await fabricSupplier.createRaw(
        user?._id,
        raw?._id,
        raw?.raw_name,
        raw?.created_date,
        raw?.status,
        raw?.hash_code
    );

    return { success: "Create successfully" };
};

const updateRaw = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };
    if (user?.organization !== "supplier")
        return { error: "Organization is not illegal" };

    const rawId = req.params?.rawId;
    if (!rawId) return { error: "Missing rawId" };
    const raw = await rawModel.findById(rawId);
    if (!raw) return { message: "Raw not found" };
    if (raw?.status === "ORDERED" || raw?.status === "SUPPLIED")
        return { error: "Can not edit this raw" };

    raw.raw_name = req.body?.raw_name;
    raw.status = "UPDATED";
    raw.hash_code = await hash.hashData(raw);
    await raw.save();

    await fabricSupplier.updateRaw(
        user?._id,
        raw?._id,
        raw?.raw_name,
        raw?.status,
        raw?.hash_code
    );

    return { success: "Update a raw successfully" };
};

const orderRaw = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };
    if (user?.organization !== "manufacturer")
        return { error: "Organization is not illegal" };

    const rawId = req.params?.rawId;
    if (!rawId) return { error: "Missing rawId" };
    const raw = await rawModel.findById(rawId);
    if (!raw) return { error: "Raw not found" };
    if (raw?.status !== "CREATED" && raw?.status !== "UPDATED")
        return { error: "This raw is ordered or supplied" };

    raw.manufacturer = user;
    raw.status = "ORDERED";
    raw.hash_code = await hash.hashData(raw);
    await raw.save();

    await fabricManufacturer.orderRaw(
        user?._id,
        raw?._id,
        raw?.status,
        raw?.hash_code
    );

    return { success: "Order successfully" };
};

const supplyRaw = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };
    if (user?.organization !== "supplier")
        return { error: "Organization is not illegal" };

    const rawId = req.params.rawId;
    if (!rawId) return { error: "Missing rawId" };
    const raw = await rawModel.findById(rawId);
    if (!raw) return { error: "Raw not found" };
    if (raw.status !== "ORDERED")
        return { error: "This raw is not ordered or is supplied" };

    raw.supplied_date = Date.now();
    raw.status = "SUPPLIED";
    raw.hash_code = await hash.hashData(raw);
    await raw.save();

    await fabricSupplier.supplyRaw(
        user?._id,
        raw?._id,
        raw?.supplied_date,
        raw?.status,
        raw?.hash_code
    );

    return { success: "Supply successfully" };
};

const verifyRaw = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };

    const rawId = req.params.rawId;
    if (!rawId) return { error: "Missing rawId" };
    const raw = await rawModel.findById(rawId);
    if (!raw) return { error: "Raw not found" };

    const rawFabric = await fabricUtil.getRaw(
        user?.organization,
        user?._id,
        raw?._id
    );
    if (JSON.parse(rawFabric).HashCode === raw.hash_code)
        return { success: "Data is verified correctly" };
    return { error: "Invalid data" };
};

const getRaw = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };
    const rawId = req.params?.rawId;
    if (!rawId) return { error: "Missing rawId" };

    const raw = await rawModel
        .findById(rawId)
        .populate("supplier", options)
        .populate("manufacturer", options);
    if (!raw) return { error: "Raw not found" };

    return raw;
};

const getRaws = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };

    if (user?.organization === "manufacturer")
        return await rawModel
            .find()
            .populate("supplier", options)
            .populate("manufacturer", options);

    if (user?.organization === "supplier")
        return await rawModel
            .find({ supplier: user?._id })
            .populate("supplier", options)
            .populate("manufacturer", options);
    else return [];
};

const getRawHistories = async (req) => {
    const user = req.user;
    if (!user) return { error: "User not found" };
    const rawId = req.params?.rawId;
    if (!rawId) return { error: "Missing rawId" };

    const rawFabric = await fabricUtil.getRawHistories(
        user?.organization,
        user?._id,
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
