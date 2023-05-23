import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true,
    }
});

const Role = mongoose.model("role", roleSchema);

export default Role;