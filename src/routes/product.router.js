import { Router } from "express";
import passport from "passport";
import ProductService from "../services/product.service.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";

const router = Router();
const productService = new ProductService();

router.get("/", async (req, res) => {
    const products = await productService.getAll();
    res
        .status(200)
        .json({ status: "success", payload: products });
})

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productService.getById(pid);
    res
        .status(200)
        .json({ status: "success", payload: product });
})

// crear (solo ADMIN)
router.post("/", 
    passport.authenticate("jwt", {session: false}), 
    authorizeRole("admin"), 
    async (req, res) => {
        const productData = req.body;
        const createdProduct = await productService.create(productData);
        res
            .status(201)
            .json({ status: "success", payload: createdProduct });
    } 
)

// actualizar (solo ADMIN)
router.put("/:pid", 
    passport.authenticate("jwt", {session: false}), 
    authorizeRole("admin"),
    async (req, res) => {
        const { pid } = req.params;
        const updateData = req.body;
        const updatedProduct = await productService.update(pid, updateData);
        res
            .status(200)
            .json({ status: "success", payload: updatedProduct });
    }
)

// eliminar (solo ADMIN)
router.delete("/:pid", 
    passport.authenticate("jwt", {session: false}), 
    authorizeRole("admin"),
    async (req, res) => {
        const { pid } = req.params;
        const deletedProduct = await productService.delete(pid);
        res
            .status(200)
            .json({ status: "success", payload: deletedProduct });
    }
)