import UserService from "./user.service.js";
import CartService from "./cart.service.js";
import { createHash, isValidPassword, generateToken } from "../utils/index.js";

const userService = new UserService();
const cartService = new CartService();

export default class AuthService {
    async register({ first_name, last_name, email, age, password }) {
        const exists = await userService.getByEmail(email);
        if (exists) return null;
        const hashed = createHash(password);
        const user = await userService.create({ first_name, last_name, email, age, password: hashed });
        if (!user) return null;
        await cartService.ensureUserCart(user._id);
        return user;
    }

    async login(email, password) {
        const user = await userService.getByEmail(email);
        if (!user) return null;
        const ok = isValidPassword(user.password, password);
        if (!ok) return null;
        const payload = { id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role };
        const token = generateToken(payload);
        return { user, token, payload };
    }
}