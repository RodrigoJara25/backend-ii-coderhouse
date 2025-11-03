import bcrypt from 'bcrypt';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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




export { join, __dirname };