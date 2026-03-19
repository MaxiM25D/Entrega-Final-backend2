import { TicketDTO } from "./ticket.dto.js"

export class PurchaseDTO {
  constructor(ticket, productsNotPurchased) {
    this.ticket = new TicketDTO(ticket)
    this.productsNotPurchased = productsNotPurchased
  }
}