const productModel = require('../models/product');

exports.createProduct = async (req, res) => {
    const { id, name, price, manuName, desc } = req.body.product;

    const modelRes = await productModel.createProduct({ name, id, price, manuName, desc });
    res.send(modelRes);
};

exports.updateProduct = async (req, res) => {
    const { id, name, price, desc } = req.body.product;
    const { productId } = req.params

    const modelRes = await productModel.updateProduct({ productId, id, name, price, desc });
    res.send(modelRes);
};

exports.getProductbyId = async (req, res) => {
    const { id, productId, role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await productModel.getProductById(true, false, { productId, id });
    } else if (role === 'consumer') {
        modelRes = await productModel.getProductById(false, true, { productId, id });
    }
    res.send(modelRes);
};

exports.getAllProducts = async (req, res) => {
    const { id, role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await productModel.getAllProducts(true, false, { id });
    } else if (role === 'consumer') {
        modelRes = await productModel.getAllProducts(false, true, { id });
    }
    res.send(modelRes);
};

exports.getLog = async (req, res) => {
    const { id, productId, role } = req.params

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await productModel.getLog(true, false, { productId, id });
    } else if (role === 'consumer') {
        modelRes = await productModel.getLog(false, true, { productId, id });
    }
    res.send(modelRes);
};