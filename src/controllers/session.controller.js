import { generateToken } from "../utils/index.js";
import CartService from "../services/cart.service.js";

const cartService = new CartService();

export const registerOk = async (req, res) => {
    res.redirect("/login");
    // respuesta en json
        // req.user contiene el usuario registrado
        /*res.status(201).json({
        status: "success",
        user: req.user
    });*/
};

export const failRegister = (req, res) => {
    res.status(400).json({ status: "error", message: "Error al registrar el usuario" });
};

export const loginOk = async (req, res) => {
    const userId = req.user._id.toString();
    await cartService.ensureUserCart(userId);
    // req.user contiene el usuario autenticado
    const payload = {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
    };
    const token = generateToken(payload);   // Genera el token JWT
    res.cookie(process.env.COOKIE_NAME || "authCookie", token, { maxAge: 3600000, httpOnly: true });    // Guarda el token en una cookie httpOnly
    // Redirige al perfil del usuario
    console.log("Sesión iniciada con éxito");
    res.redirect("/profile");

    // Respuesta en json
    /*res.status(200).json({
        status: "success",
        message: "Login exitoso",
        token, // puedes enviar el token si el frontend lo necesita
        user: userPayload
    })*/
};

export const failLogin = (req, res) => {
    res
        .status(400)
        .json({ status: "error", message: "Error al iniciar sesión" });
};

export const current = (req, res) => {
    res.json({ status: "success", user: req.user });
};