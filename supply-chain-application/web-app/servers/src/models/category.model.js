import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    }
});

const Category = mongoose.model("category", categorySchema);

export default Category;