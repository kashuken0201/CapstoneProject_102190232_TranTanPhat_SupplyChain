const authRouter = require('express').Router();
const controller = require('../controllers/user.js');

authRouter.post('/signup/:role', controller.signup);
authRouter.get('/:role', controller.getAllUser);
authRouter.post('/signin/:role', controller.signin);

module.exports = authRouter;
