import mongoose from "mongoose";

const items = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const itemSchema = mongoose.models.itemSchema || mongoose.model("itemSchema", items);

export default itemSchema;
