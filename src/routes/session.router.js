import { Router } from "express";
import passport from "passport";

import { current, failLogin, failRegister, loginOk, registerOk } from "../controllers/session.controller.js";

const router = Router();

// registro de usuarios con la estrategia 'register' de passport
router.post('/register', 
    passport.authenticate('register', {failureRedirect: '/api/sessions/failregister', session: false}), 
    registerOk
)

// ruta para manejar fallos en el registro
router.get('/failregister', failRegister);

// login de usuarios con la estrategia 'login' de passport
router.post('/login', 
    passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin', session: false}), 
    loginOk
)

// ruta para manejar fallos en el login
router.get('/faillogin', failLogin);

// current => ruta para validar al usuario logueado y devolver en una respuesta sus datos
router.get('/current', 
    passport.authenticate('jwt', { session: false}), 
    current
)

export default router;