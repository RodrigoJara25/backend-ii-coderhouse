import CartDAO from "../dao/classes/cart.dao.js";

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
        if (!cart) cart = await this.create({ user: userId, products: [] });
        return cart;
    }
}
export default new CartRepository();