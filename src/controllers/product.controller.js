import ProductService from "../services/product.service.js";

const service = new ProductService();

export const getAll = async (req, res) => {
    const products = await service.getAll();
    res
        .status(200)
        .json({ status: "success", payload: products });
};

export const getById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await service.getById(pid);
        res
            .status(200)
            .json({ status: "success", payload: product });
    } catch (err) {
        res.status(404).json({ status: "error", message: err.message });
    }
};

export const create = async (req, res) => {
    const created = await service.create(req.body);
    res
        .status(201)
        .json({ status: "success", payload: created });
};

export const update = async (req, res) => {
    const updated = await service.update(req.params.pid, req.body);
    res
        .status(200)
        .json({ status: "success", payload: updated });
};

export const remove = async (req, res) => {
    const deleted = await service.delete(req.params.pid);
    res
        .status(200)
        .json({ status: "success", payload: deleted });
};