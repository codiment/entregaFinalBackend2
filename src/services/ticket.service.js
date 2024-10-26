// logica para la creacion del ticket de compra.
import ticketRepository from "../repositories/ticket.repository.js";
class TicketService {

    async createTicket(ticketData){

        try {
            // revisamos que no exista otro ticket igual
            const existingTicket = await ticketRepository.getTicketByCode(ticketData.code);

            if(existingTicket) throw new Error("El ticket ya existe");

            // creamos un nuevo ticket

            return await ticketRepository.createTicket(ticketData);

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    
    async findTicketByCode(code){
        try {
            const existingTicket = await ticketRepository.getTicketByCode(code);
            if(!existingTicket){
                throw new Error("El Ticket buscado , no existe en el sistema");
            }

            return existingTicket;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await ticketRepository.getTicketById(id);
            if(!ticket) throw new Error("El ticket que intenta buscar , no existe");


            return ticket;
        } catch (error) {
            console.log(error);

            return ({message: "Error al intentar encontrar el ticket", error: error});
        }
    }
}

export default new TicketService();