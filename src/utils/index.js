import bcrypt from 'bcrypt';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import envs from '../config/envs.config.js';

// Variables para obtener el __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), ".."); 

// bcrypt settings
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

// JWT settings
export const generateToken = (user) => {
    // el payload puede ser cualquier objeto, en este caso usamos { user }, la clave secreta se obtiene de las variables de entorno y el tiempo de expiración es de 1 hora
    // payload = { 
    //             user: { 
    //                     id, 
    //                     first_name, 
    //                     last_name, 
    //                     email 
    //                   }, 
    //            }
    return jwt.sign({ user }, envs.jwt_secret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, envs.jwt_secret);
    } catch (error) {
        return null;
    }
};


export { join, __dirname };