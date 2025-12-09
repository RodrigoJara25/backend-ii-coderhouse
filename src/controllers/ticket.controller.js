import TicketService from "../services/ticket.service.js";

const service = new TicketService();

export const purchase = async (req, res) => {
    try {
        const { cid } = req.params;
        const email = req.user?.email ?? req.user?.user?.email;
        const result = await service.checkout(cid, email);
        res.status(result.ticket ? 201 : 207).json({ status: "success", payload: result });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
};