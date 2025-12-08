import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    code: { 
        type: String, 
        required: true, 
        unique: true 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    stock: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    category: { 
        type: String, 
        default: "general" 
    },
    status: { 
        type: Boolean, 
        default: true 
    },
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;