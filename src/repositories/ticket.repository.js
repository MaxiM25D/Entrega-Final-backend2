import { TicketDAO } from "../dao/ticket.dao.js";

const ticketDAO = new TicketDAO();

export class TicketRepository {

  createTicket(data) {
    return ticketDAO.create(data);
  }

}