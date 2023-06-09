import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    raws: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Raw",
        },
    ],
    status: {
        type: String,
        required: true,
        default: "CREATED",
    },
    description: {
        type: String,
    },
    timestamps: {
        created_date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        ordered_date: {
            type: Date,
        },
        delivered_date: {
            type: Date,
        },
        received_date: {
            type: Date,
        },
        sold_date: {
            type: Date,
        },
    },
    actors: {
        manufacturer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        distributor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        retailer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    hash_code: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("product", productSchema);

export default Product;
