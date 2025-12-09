import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            price: {
                type: Number
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;