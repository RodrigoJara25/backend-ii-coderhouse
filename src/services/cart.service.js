import cartRepo from "../repository/cart.repository.js";

export default class CartService {

    async ensureUserCart(userId) { 
        return await cartRepo.ensureUserCart(userId); 
    }

    async getById(id) { 
        return await cartRepo.getById(id); 
    }

    async update(id, data) { 
        return await cartRepo.update(id, data); 
    } 

    async addProductToCart(cartId, productId, quantity = 1) {
        if (!cartId || !productId) {
            throw new Error("Cart ID and Product ID are required");
        }
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
        const result = await cartRepo.addProductToCart(cartId, productId, quantity);
        if (!result) {
            throw new Error("Failed to add product to cart");
        }
        return result;
    }
}