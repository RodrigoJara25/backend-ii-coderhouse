import ProductDAO from "../dao/classes/product.dao.js";

class ProductRepository {
    constructor() {
        this.dao = new ProductDAO();
    }

    async getAll() { 
        return await this.dao.getProducts() ?? [];
    }

    async getById (id) {
        return await this.dao.getProductById(id);
    }

    async create(data) { 
        return await this.dao.createProduct(data);
    }

    async update(id, data) { 
        return await this.dao.updateProduct?.(id, data) ?? null; 
    }

    async delete(id) { 
        return await this.dao.deleteProduct?.(id) ?? null;
    }
}
export default new ProductRepository();