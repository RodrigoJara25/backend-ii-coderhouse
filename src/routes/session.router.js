import { Router } from "express";
import passport from "passport";

import { generateToken } from "../utils/index.js";

const router = Router();

// registro de usuarios con la estrategia 'register' de passport
router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister', session: false}), async (req, res) => {
    
    // respuesta en handlebars
    res.redirect('/login');

    // respuesta en json
    // req.user contiene el usuario registrado
    /*res.status(201).json({
        status: "success",
        user: req.user
    });*/
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
    
    const token = generateToken(userPayload);   // Genera el token JWT
    res.cookie('authCookie', token, { maxAge: 3600000, httpOnly: true });   // Guarda el token en una cookie httpOnly

    // Redirige al perfil del usuario
    console.log("Sesión inciada con éxito");
    res.redirect('/profile');

    // Respuesta en json
    /*res.status(200).json({
        status: "success",
        message: "Login exitoso",
        token, // puedes enviar el token si el frontend lo necesita
        user: userPayload
    })*/
})

// ruta para manejar fallos en el login
router.get('/faillogin', (req, res) => {
    res
        .status(400)
        .json({ status: "error", message: "Error al iniciar sesion" });
});

// current => ruta para validar al usuario logueado y devolver en una respuesta sus datos
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({ status: "success", user: req.user });
})

export default router;