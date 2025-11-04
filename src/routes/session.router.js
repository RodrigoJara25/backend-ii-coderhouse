import { Router } from "express";
import passport from "passport";

import { generateToken } from "../utils/index.js";

const router = Router();

// registro de usuarios con la estrategia 'register' de passport
router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister', session: false}), async (req, res) => {
    res.redirect('/login');
})

// ruta para manejar fallos en el registro
router.get('/failregister', (req, res) => {
    res
        .status(400)
        .json({ status: "error", message: "Error al registrar el usuario" });
});

// login de usuarios con la estrategia 'login' de passport
router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin', session: false}), async (req, res) => {
    // req.user contiene el usuario autenticado
    const userPayload = {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
    };
    // Genera el token JWT
    const token = generateToken(userPayload);

    // Guarda el token en una cookie httpOnly
    res.cookie('authCookie', token, { maxAge: 3600000, httpOnly: true });

    console.log("Sesión inciada con éxito");

    // Redirige al perfil del usuario
    res.redirect('/profile');
})

// ruta para manejar fallos en el login
router.get('/faillogin', (req, res) => {
    res
        .status(400)
        .json({ status: "error", message: "Error al iniciar sesion" });
});

export default router;