import { Router } from "express";

const router = Router();

router.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

export default router;