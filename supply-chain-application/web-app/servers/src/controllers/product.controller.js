"use strict";

import productService from "../services/product.service.js";
import response from "../middlewares/response.middleware.js";
import handleError from "../middlewares/error.middleware.js";

const createProduct = async (req, res) => {
    try {
        const rs = await productService.createProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const updateProduct = async (req, res) => {
    try {
        const rs = await productService.updateProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const orderProduct = async (req, res) => {
    try {
        const rs = await productService.orderProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const provideProduct = async (req, res) => {
    try {
        const rs = await productService.provideProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const deliveryProduct = async (req, res) => {
    try {
        const rs = await productService.deliveryProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const receiveProduct = async (req, res) => {
    try {
        const rs = await productService.receiveProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const sellProduct = async (req, res) => {
    try {
        const rs = await productService.sellProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const verifyProduct = async (req, res) => {
    try {
        const rs = await productService.verifyProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getProduct = async (req, res) => {
    try {
        const rs = await productService.getProduct(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getProducts = async (req, res) => {
    try {
        const rs = await productService.getProducts(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getProductHistories = async (req, res) => {
    try {
        const rs = await productService.getProductHistories(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
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
    getProductHistories,
    getProductHistories,
};
