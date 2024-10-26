// Comunicacion entre el DAO y el service
import TicketDAO from "../dao/ticket.dao.js";

class TicketRepository {
    async createTicket(ticketData){
        return await TicketDAO.save(ticketData);
    }

    async getTicketById(id){
        return TicketDAO.findById(id);
    }

    async getTicketByCode(code){
        return await TicketDAO.findOne({code})
    }

    async deleteTicketById(id){
        return await TicketDAO.delete(id);
    }
}

export default new TicketRepository();