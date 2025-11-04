import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import userModel from "../models/user.model.js";
import { createHash, generateToken, isValidPassword } from "../utils/index.js";
import envs from "../config/envs.config.js";

// Estrategias
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;

// 
const initializePassport = () => {

    // estrategia local para registro
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            const userFound = await userModel.findOne({ email: username });
            if (userFound) {
                console.log("El usuario ya existe");
                return done(null, false);
            }
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            };
            const createdUser = await userModel.create(newUser);
            return done(null, createdUser);
        } catch (error) {
            return done("Error al registrar el usuario " + error, false);
        }
    }
    ));

    // estrategia local para login
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    },
    async (username, password, done) => {
        try {
            const userExist = await userModel.findOne({ email: username });
            console.log(userExist);
            if (!userExist) return done(null, false);   // no existe el usuario

            const isValid = isValidPassword(password, userExist.password);
            console.log("isValid:", isValid);
            if (!isValid) return done(null, false);     // password incorrecto

            // Si todo está bien, retorna el usuario
            return done(null, userExist);

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

// función para extraer el token JWT desde la cookie
const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies['authCookie']
    }
    return token
}

export default initializePassport;