import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    material_name: {
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

const Material = mongoose.model("material", materialSchema);

export default Material;