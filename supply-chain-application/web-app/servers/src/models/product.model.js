import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
    },
    categorys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
});

const Product = mongoose.model("product", productSchema);

export default Product;