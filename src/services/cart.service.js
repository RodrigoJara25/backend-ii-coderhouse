import cartRepo from "../repository/cart.repository.js";

export default class CartService {
    async ensureUserCart(userId) { return await cartRepo.ensureUserCart(userId); }
    async getById(id) { return await cartRepo.getById(id); }
    async update(id, data) { return await cartRepo.update(id, data); }
}