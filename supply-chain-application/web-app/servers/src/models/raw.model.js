import mongoose from "mongoose";

const rawSchema = new mongoose.Schema({
    key: {
        type: String,
    },
    raw_name: {
        type: String,
        required: true,
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
});

const Raw = mongoose.model("Raw", rawSchema);

export default Raw;
