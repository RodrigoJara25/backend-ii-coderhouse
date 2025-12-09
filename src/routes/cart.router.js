import { Router } from "express";
import passport from "passport";
import CartService from "../services/cart.service.js";
import TicketService from "../services/ticket.service.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";

const router = Router();
const cartService = new CartService();
const ticketService = new TicketService();

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

// Finalizar compra del carrito (solo USER)
router.post("/:cid/purchase",
    passport.authenticate("jwt", { session: false }),
    authorizeRole("user"),
    async (req, res) => {
        try {
            const { cid } = req.params;
            const email = req.user?.email ?? req.user?.user?.email;
            const result = await ticketService.checkout(cid, email);
            const status = result.ticket ? 201 : 207; // 201 si se creó ticket, 207 si compra parcial
            res.status(status).json({ status: "success", payload: result });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
)

export default router;