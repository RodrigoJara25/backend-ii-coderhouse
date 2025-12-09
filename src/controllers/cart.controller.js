import CartService from "../services/cart.service.js";

const service = new CartService();

export const addProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await service.addProductToCart(cid, pid, quantity);
        res.status(200).json({ status: "success", payload: cart });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
};