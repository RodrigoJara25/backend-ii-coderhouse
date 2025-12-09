import ticketModel from "../models/ticket.model.js";

export default class TicketDAO {
    async create(data) {
        const doc = await ticketModel.create(data);
        return doc.toObject ? doc.toObject() : doc;
    }
}