import productModel from "../models/product.model.js";

export default class Product {

    getProducts = async () => {
        try {
            const products = await productModel.find().lean();
            return products;
        } catch (error) {
            console.error("Error getting products:", error.message);
            return [];
        }
    }

    getProductById = async (id) => {
        try {
            const product = await productModel.findById(id).lean();
            return product || null;
        } catch (error) {
            console.error(`Error getting product by ID ${id}:`, error.message);
            return null;
        }
    }

    createProduct = async (data) => {
        try {
            const newProduct = await productModel.create(data);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error("Error creating product:", error.message);
            return null;
        }
    }

    updateProduct = async (id, updatedData) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
            return updatedProduct || null;
        } catch (error) {
            console.error(`Error updating product ID ${id}:`, error.message);
            return null;
        }
    }

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id).lean();
            return deletedProduct || null;
        } catch (error) {
            console.error(`Error deleting product ID ${id}:`, error.message);
            return null;
        }
    }

}