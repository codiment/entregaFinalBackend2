// Aqui controlamos los metodos del Ticket Model.
import TicketModel from "./models/ticket.model.js";

class TicketDAO {

    async findById(id){
        return await TicketModel.findById(id);
    }

    async findOne(query){
        return await TicketModel.findOne(query);
    }

    async save(ticketData){
        const ticket = new TicketModel(ticketData);
        return await ticket.save();
    }

    async delete(id){
        return await TicketModel.findByIdAndDelete(id);
    }
}

export default new TicketDAO();