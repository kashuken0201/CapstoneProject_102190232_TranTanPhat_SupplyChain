import mongoose from "mongoose";

const rawSchema = new mongoose.Schema({
    raw_name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
    },
});

const Raw = mongoose.model("raw", rawSchema);

export default Raw;