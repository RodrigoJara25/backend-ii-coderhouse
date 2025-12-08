import jwt from "jsonwebtoken";
import envs from "../config/envs.config";

// Middleware para autorizar roles usando Passport.js
export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        const role = req.user?.role; // viene de passport.authenticate('jwt')
        if (!role) return res.status(401).json({ status: "error", message: "No autenticado" });
        const ok = allowedRoles.map(
            r => r.toLowerCase()).includes(role.toLowerCase()
        );
        if (!ok) return res.status(403).json({ status: "error", message: "No tienes permisos para realizar esta acción" });
        next();
    };
};

// Middleware para autorizar roles usando header Authorization con JWT
export const handlePolicies = (policies) => (req, res, next) => {
    if (policies?.[0] === "PUBLIC") return next();
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader) return res.status(401).json({ status: "error", message: "No autorizado" });

    const token = authHeader.split(" ")[1];
    try {
        const user = jwt.verify(token, envs.jwt_secret);
        const ok = policies.map(p => p.toUpperCase()).includes((user.role || "").toUpperCase());
        if (!ok) return res.status(403).json({ status: "error", message: "No tienes permisos para realizar esta acción" });
        req.user = user;
        next();
    } catch {
        return res.status(401).json({ status: "error", message: "Token inválido" });
    }
};