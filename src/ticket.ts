import type { Order } from './types.js';
import type { Customer } from './customer.js';

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
} as const;

export type TicketStatus = typeof TICKET_STATUS[keyof typeof TICKET_STATUS];

export class OrderTicket {
  id: number;
  customer: Customer;
  order: Order;
  status: TicketStatus;
  queueSlot:  number | null;  // 0..5
  pickupSlot: number | null;  // 0..5
  shakerId:   number | null;  // 0..2
  cansDelivered: number;

  constructor(id: number, customer: Customer, order: Order) {
    this.id = id;
    this.customer = customer;
    this.order = order;
    this.status = TICKET_STATUS.QUEUED;
    this.queueSlot  = null;
    this.pickupSlot = null;
    this.shakerId   = null;
    this.cansDelivered = 0;
  }

  get cansNeeded(): number { return this.order.canCount; }
  get isComplete(): boolean { return this.cansDelivered >= this.cansNeeded; }
}
