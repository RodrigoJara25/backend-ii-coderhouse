import productRepository from "../repository/product.repository.js";

export default class ProductService {

    async create(data) {
        return await productRepository.create(data);
    }

    async getAll() {
        return await productRepository.getAll();
    }

    async getById(id) {
        const product = await productRepository.getById(id);
        if (!product) throw new Error("Producto no encontrado");
        return product;
    }

    async update(id, data) {
        return await productRepository.update(id, data);
    }

    async delete(id) {
        return await productRepository.delete(id);
    }

}