import userRepo from "../repository/user.repository.js";

export default class UserService {

    async register(data) {
        const exists = await userRepo.getByEmail(data.email);
        if (exists) return null;
        return await userRepo.create(data);
    }

    async create(data) { 
        return await userRepo.create(data); 
    } 

    async update(userId, data) { 
        return await userRepo.update(userId, data); 
    }

    async getByEmail(email) { 
        return await userRepo.getByEmail(email); 
    }

    async getAll() { 
        return await userRepo.getAll(); 
    }

}