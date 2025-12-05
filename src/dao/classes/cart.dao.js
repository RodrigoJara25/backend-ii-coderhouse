import cartModel from "../models/cart.model.js";

export default class CartDAO {
    getCarts = async () => {
        try {
            const carts = await cartModel.find().lean();
            return carts;
        } catch (error) {
            console.error("Error fetching carts:", error.message);
            return [];
        }
    }

    getCartById = async (id) => {
        try {
            const cart = await cartModel.findById(id).lean();
            return cart || null;
        } catch (error) {
            console.error(`Error fetching cart with ID ${id}:`, error.message);
            return null;
        }
    }

    getCartByUser = async (userId) => {
        try {
            const cart = await cartModel.findOne({ user: userId }).lean();
            return cart || null;
        } catch (error) {
            console.error(`Error fetching cart for user ID ${userId}:`, error.message);
            return null;
        }
    }

    createCart = async (cartData) => {
        try {
            const newCart = await cartModel.create(cartData);
            return newCart;
        } catch (error) {
            console.error("Error creating cart:", error.message);
            return null;
        }
    }

    updateCart = async (id, updateData) => {
        try {
            const updated = await cartModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
            return updated || null;
        } catch (error) {
            console.error(`Error updating cart with ID ${id}:`, error.message);
            return null;
        }
    }
}