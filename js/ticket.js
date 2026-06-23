export const TICKET_STATUS = {
  QUEUED:       'QUEUED',        // waiting at register
  BASE_GRABBED: 'BASE_GRABBED',  // player has base can, heading to tint machine
  TINT_QUEUED:  'TINT_QUEUED',   // on tint machine input roller
  TINTING:      'TINTING',       // machine is actively tinting it
  TINT_DONE:    'TINT_DONE',     // on output shelf, waiting for player to seal
  SEALED:       'SEALED',        // player grabbed + BANG'd, heading to shaker
  SHAKING:      'SHAKING',       // in a shaker, timer running
  SHAKER_DONE:  'SHAKER_DONE',   // shaker finished, waiting to be collected
  AT_PICKUP:    'AT_PICKUP',     // player has mixed can, walking to pickup window
  DONE:         'DONE',
};

export class OrderTicket {
  constructor(id, customer, order) {
    this.id = id;
    this.customer = customer;
    this.order = order;
    this.status = TICKET_STATUS.QUEUED;
    this.queueSlot = null;  // 0..2
    this.pickupSlot = null; // 0..2
    this.shakerId = null;   // 0..2
  }
}
