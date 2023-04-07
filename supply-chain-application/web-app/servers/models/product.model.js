"use strict";

import network from './network.model';
import appUtil from "../utils/appUtil";

const createProduct = async information => {
    const { name, id, price, manuName, desc } = information;

    const networkObj = await network.connect(true, false, id, 'supply');
    const contractRes = await network.invoke(networkObj, 'createProduct', name, id, manuName, price, desc);

    return {
        data: contractRes,
        key: 'createProduct',
    };
};

const updateProduct = async information => {
    const { productId, name, id, price, desc } = information;

    const networkObj = await network.connect(true, false, id, 'supply');
    const contractRes = await network.invoke(networkObj, 'updateProduct', productId, id, name, price, desc);

    return {
        data: contractRes,
        key: 'updateProduct',
    };
};

const getProductById = async (isManufacturer, isConsumer, information) => {
    const { productId, id } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, id, 'supply');
    const contractRes = await network.query(networkObj, 'queryAsset', productId);

    return {
        data: contractRes,
        key: 'getProductById',
    };
};

const getAllProducts = async (isManufacturer, isConsumer, information) => {
    const { id } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, id, 'supply');
    const contractRes = await network.query(networkObj, 'queryAll', 'Product');

    const res = [];
    contractRes.forEach(element => {
        res.push(element.Record)
    });
    return {
        data: res,
        key: 'getAllProducts',
    };
};

const getLog = async (isManufacturer, isConsumer, information) => {
    const { productId, id } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, id, 'supply');
    const contractRes = await network.query(networkObj, 'getHistory', productId);

    return {
        data: contractRes,
        key: 'getLog',
    };
};

export default {
    getAllProducts,
    getProductById,
    getLog,
    createProduct,
    updateProduct
}