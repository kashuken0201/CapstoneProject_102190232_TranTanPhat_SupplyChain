const network = require('../fabric/network.js');
// const apiResponse = require('../utils/apiResponse.js');

exports.createProduct = async information => {
    const { name, id, price, manuName, desc } = information;

    const networkObj = await network.connect(true, false, id, 'supply');
    const contractRes = await network.invoke(networkObj, 'createProduct', name, id, manuName, price, desc);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: contractRes,
        key: 'createProduct',
    };
};

exports.updateProduct = async information => {
    const { productId, name, id, price, desc } = information;

    const networkObj = await network.connect(true, false, id, 'supply');
    const contractRes = await network.invoke(networkObj, 'updateProduct', productId, id, name, price, desc);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);

    return {
        data: contractRes,
        key: 'updateProduct',
    };
};

exports.getProductById = async (isManufacturer, isConsumer, information) => {
    const { productId, id } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, id, 'supply');
    const contractRes = await network.query(networkObj, 'queryAsset', productId);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: contractRes,
        key: 'getProductById',
    };
};

exports.getAllProducts = async (isManufacturer, isConsumer, information) => {
    const { id } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, id, 'supply');
    const contractRes = await network.query(networkObj, 'queryAll', 'Product');

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    const res = [];
    contractRes.forEach(element => {
        res.push(element.Record)
    });
    return {
        data: res,
        key: 'getAllProducts',
    };
};

exports.getLog = async (isManufacturer, isConsumer, information) => {
    const { productId, id } = information;

    const networkObj = await network.connect(isManufacturer, isConsumer, id, 'supply');
    const contractRes = await network.query(networkObj, 'getHistory', productId);

    // const error = networkObj.error || contractRes.error;
    // if (error) {
    //     const status = networkObj.status || contractRes.status;
    //     return apiResponse.createModelRes(status, error);
    // }

    // return apiResponse.createModelRes(200, 'Success', contractRes);
    return {
        data: contractRes,
        key: 'getLog',
    };
};

