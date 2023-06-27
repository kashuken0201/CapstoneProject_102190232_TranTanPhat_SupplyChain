import mongoose from "mongoose";

const rawSchema = new mongoose.Schema({
    raw_name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "CREATED",
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    supplied_date: {
        type: Date,
    },
    hash_code: {
        type: String,
    },
});

const Raw = mongoose.model("Raw", rawSchema);

export default Raw;
