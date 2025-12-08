import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";

import envs from "../config/envs.config.js";

import AuthService from "../services/auth.service.js";

const authService = new AuthService();

// Estrategias
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;

// función para extraer el token JWT desde la cookie
const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies['authCookie']
    }
    return token
}

// 
const initializePassport = () => {

    // estrategia local para registro (delegada a AuthService)
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;    // no se llama al 'email' porque ya lo tenemos en 'username'
        try {
            const user = await authService.register({
                first_name,
                last_name,
                email: username,
                age,
                password
            });
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done("Error al registrar el usuario " + error, false);
        }
    }
    ));

    // estrategia local para login (delegada a AuthService)
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    },
    async (username, password, done) => {
        try {
            const result = await authService.login(username, password);
            if (!result) return done(null, false); // usuario inexistente o contraseña inválida
            // Pasamos el usuario autenticado; el token se genera en la ruta /login
            return done(null, result.user);
            /*const userExist = await userModel.findOne({ email: username });
            console.log(userExist);
            if (!userExist) return done(null, false);   // no existe el usuario

            const isValid = isValidPassword(password, userExist.password);
            console.log("isValid:", isValid);
            if (!isValid) return done(null, false);     // password incorrecto

            // Si todo está bien, retorna el usuario
            return done(null, userExist);*/
        } catch (error) {
            return done("Error al iniciar sesión " + error, false);
        }
    }
    ));

    // estrategia JWT para proteger rutas y extraer el usuario a partir del token
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),   // extraemos el token desde la cookie
        secretOrKey: envs.jwt_secret
    },
    async (jwt_payload, done) => {
        try {
            // el payload es asignado en req.user
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }
    ));

    // esta comentado porque no usamos sesiones con passport
    /*passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    })*/
}

export default initializePassport;