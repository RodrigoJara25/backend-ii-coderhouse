import CartDAO from "../dao/classes/cart.dao.js";
import userModel from "../dao/models/user.model.js";

class CartRepository {
    constructor() {
        this.dao = new CartDAO();
    }
    async getAll() { return await this.dao.getCarts(); }
    async getById(id) { return await this.dao.getCartById(id); }
    async getByUser(userId) { return await this.dao.getCartByUser(userId); }
    async create(data) { return await this.dao.createCart(data); }
    async update(id, data) { return await this.dao.updateCart(id, data); }
    async delete(id) { return await this.dao.deleteCart(id); }
    async ensureUserCart(userId) {
        let cart = await this.getByUser(userId);
        if (!cart) {
            cart = await this.create({ user: userId, products: [] });
            // Asociar el carrito al usuario
            await userModel.findByIdAndUpdate(userId, { cart: cart._id }, { new: true });
        }
        return cart;
    }
    async addProductToCart(cartId, productId, quantity) {
        const result = await this.dao.addProductToCart(cartId, productId, quantity);
        return result;
    }
}
export default new CartRepository();