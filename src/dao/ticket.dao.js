import { Ticket } from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

export class TicketDAO {

  create(data) {
    return Ticket.create({
      code: uuidv4(),
      ...data
    });
  }
}