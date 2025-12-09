import { Router } from "express";
import passport from "passport";
import CartService from "../services/cart.service.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";

const router = Router();
const cartService = new CartService();

// Agregar producto al carrito (solo USER)
router.post("/:cid/product/:pid",
    passport.authenticate("jwt", { session: false }),
    authorizeRole("user"),
    async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const quantity = req.body.quantity;
            const cart = await cartService.addProductToCart(cid, pid, quantity);
            res.status(200).json({ status: "success", payload: cart });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }
);

export default router;