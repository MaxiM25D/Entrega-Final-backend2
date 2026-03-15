import { Ticket } from "../models/ticket.model.js";

export class TicketDAO {

  create(data) {
    return Ticket.create(data);
  }

}