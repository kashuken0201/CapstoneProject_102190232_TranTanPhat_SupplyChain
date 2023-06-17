"use strict";

import rawService from "../services/raw.service.js";
import response from "../middlewares/response.middleware.js";
import handleError from "../middlewares/error.middleware.js";

const createRaw = async (req, res) => {
    try {
        const rs = await rawService.createRaw(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const updateRaw = async (req, res) => {
    try {
        const rs = await rawService.updateRaw(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const orderRaw = async (req, res) => {
    try {
        const rs = await rawService.orderRaw(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const supplyRaw = async (req, res) => {
    try {
        const rs = await rawService.supplyRaw(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const verifyRaw = async (req, res) => {
    try {
        const rs = await rawService.verifyRaw(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getRaw = async (req, res) => {
    try {
        const rs = await rawService.getRaw(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getRaws = async (req, res) => {
    try {
        const rs = await rawService.getRaws(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getRawHistories = async (req, res) => {
    try {
        const rs = await rawService.getRawHistories(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
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
