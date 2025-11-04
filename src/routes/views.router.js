import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.render("profile", { title: "Profile", user: req.user.user });
});

export default router;