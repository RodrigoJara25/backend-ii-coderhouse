import TicketDAO from "../dao/classes/ticket.dao.js";

const dao = new TicketDAO();

export default {
    async create(data) { 
        return await dao.create(data); 
    }
};