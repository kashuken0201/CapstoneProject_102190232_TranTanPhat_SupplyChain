import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const auth = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const user = await userModel.findOne({
            _id: data._id,
            "tokens.token": token,
        });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({
            error: "Not authorized to access this resource",
        });
    }
};

export default {
    auth,
};
