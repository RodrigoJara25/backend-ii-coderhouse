import { Router } from "express";
import passport from "passport";

import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { addProduct } from "../controllers/cart.controller.js";
import { purchase } from "../controllers/ticket.controller.js";

const router = Router();

// Agregar producto al carrito (solo USER)
router.post("/:cid/product/:pid",
    passport.authenticate("jwt", { session: false }),
    authorizeRole("user"),
    addProduct
);

// Finalizar compra del carrito (solo USER)
router.post("/:cid/purchase",
    passport.authenticate("jwt", { session: false }),
    authorizeRole("user"),
    purchase
)

export default router;