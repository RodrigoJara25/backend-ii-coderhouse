import UserDAO from "../dao/classes/user.dao.js";

class UserRepository {
    constructor() {
        this.dao = new UserDAO();
    }
    async getAll() { return await this.dao.getUsers(); }
    async getByEmail(email) { return await this.dao.getUserByEmail(email); }
    async getById(id) { return await this.dao.getUserById?.(id) ?? null; }
    async create(data) { return await this.dao.createUser(data); }
    async update(id, data) { return await this.dao.updateUser(id, data); }
    async delete(id) { return await this.dao.deleteUser?.(id) ?? null; }
}
export default new UserRepository();