const productRouter = require('express').Router();
const controller = require('../controllers/product.js');

productRouter.post('/', controller.createProduct);
productRouter.post('/:productId', controller.updateProduct);
productRouter.get('/:productId/:role/:id', controller.getProductbyId);
productRouter.get('/:role/:id', controller.getAllProducts);
productRouter.get('/log/:productId/:role/:id', controller.getLog);

module.exports = productRouter;
