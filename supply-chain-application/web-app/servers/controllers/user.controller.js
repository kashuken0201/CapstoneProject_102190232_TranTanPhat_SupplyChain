"use strict";

import model from '../models/user.model';

const signup = async (req, res) => {
    const { userType, address, name, email, password } = req.body.user;
    const { role } = req.params;

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.signup(true, false, { userType, address, name, email, password });
    } else if (role === 'consumer') {
        modelRes = await model.signup(false, true, { userType, address, name, email, password });
    }
    res.send(modelRes);
};

const signin = async (req, res) => {
    const { username, password, userType } = req.body;
    const { role } = req.params;

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.signin(true, false, { username, password, userType });
    } else if (role === 'consumer') {
        modelRes = await model.signin(false, true, { username, password, userType });
    }
    res.send(modelRes);
};

const getAllUser = async (req, res) => {
    const { role } = req.params;

    let modelRes = "";
    if (role === 'manufacturer') {
        modelRes = await model.getAllUser(true, false);
    } else if (role === 'consumer') {
        modelRes = await model.getAllUser(false, true);
    }
    res.send(modelRes);
};

export default {
    getAllUser,
    signin,
    signup
}