import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: "Invalid Email address" });
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ["DEACTIVE", "ACTIVE"],
        default: "ACTIVE",
    },
    organization: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (
    email,
    password,
    organization
) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email });
    if (user.organization !== organization)
        throw new Error("Invalid organization");
    if (!user) {
        throw new Error("Invalid login credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
    }
    return user;
};

const User = mongoose.model("User", userSchema);

export default User;
