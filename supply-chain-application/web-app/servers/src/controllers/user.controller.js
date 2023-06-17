"use strict";

import userService from "../services/user.service.js";
import response from "../middlewares/response.middleware.js";
import handleError from "../middlewares/error.middleware.js";

const signUp = async (req, res) => {
    try {
        const rs = await userService.signUp(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const signIn = async (req, res) => {
    try {
        const rs = await userService.signIn(req);

        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const logOut = async (req, res) => {
    try {
        await userService.logOut(req);
        response("Logout", res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const infoUser = async (req, res) => {
    try {
        const rs = await userService.infoUser(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const changeInfoUser = async (req, res) => {
    try {
        await userService.changeInfoUser(req);
        response(true, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getUser = async (req, res) => {
    try {
        const rs = await userService.getUser(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getUsers = async (req, res) => {
    try {
        const rs = await userService.getUsers(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

const getDashboard = async (req, res) => {
    try {
        const rs = await userService.getDashboard(req);
        response(rs, res);
    } catch (err) {
        handleError(500, err, res);
    }
};

export default {
    signIn,
    signUp,
    logOut,
    infoUser,
    changeInfoUser,
    getUser,
    getUsers,
    getDashboard,
};
