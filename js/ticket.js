export const TICKET_STATUS = {
  QUEUED:         'QUEUED',         // waiting at register
  FETCHING_BASE:  'FETCHING_BASE',  // player assigned, walking to shelf
  FETCHING_TINT:  'FETCHING_TINT',
  LOADING_SHAKER: 'LOADING_SHAKER',
  SHAKING:        'SHAKING',        // in a shaker, timer running
  READY:          'READY',          // shaker done, waiting to be collected
  AT_PICKUP:      'AT_PICKUP',      // can collected, player walking to pickup
  DONE:           'DONE',
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
