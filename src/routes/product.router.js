import { Router } from "express";
import passport from "passport";

import { authorizeRole } from "../middlewares/authorizeRole.middleware.js"; 
import { create, getAll, getById, remove, update } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getAll);

router.get("/:pid", getById);

// crear (solo ADMIN)
router.post("/", 
    passport.authenticate("jwt", {session: false}), 
    authorizeRole("admin"), 
    create 
)

// actualizar (solo ADMIN)
router.put("/:pid", 
    passport.authenticate("jwt", {session: false}), 
    authorizeRole("admin"),
    update
)

// eliminar (solo ADMIN)
router.delete("/:pid", 
    passport.authenticate("jwt", {session: false}), 
    authorizeRole("admin"),
    remove
)

export default router;