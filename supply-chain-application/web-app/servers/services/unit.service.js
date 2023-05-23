import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    unit: {
        type: String,
        required: true,
        unique: true,
    }
});

const Unit = mongoose.model("unit", unitSchema);

export default Unit;