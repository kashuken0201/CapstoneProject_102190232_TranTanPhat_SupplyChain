import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById({
            _id: data._id,
        }); 

        if (!user) throw new Error();
        if (user.token !== token) throw new Error();

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
