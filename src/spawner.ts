import { generateOrder } from './order';
import { Customer } from './customer';
import { OrderTicket } from './ticket';
import { pickCustomer } from './dialogue';
import type { StoreManager } from './storemanager';

const MAX_QUEUE      = 6; // max customers waiting in the register line
const SPAWN_INTERVAL = 8; // seconds between arrivals

// Owns customer arrival: its own cadence + ticket id sequence. Registers each
// new customer with the store it's given. Extracted from StoreManager so the
// store stays a focused model + orchestrator.
export class Spawner {
  private _timer = 1.0; // quick first arrival
  private _seq   = 0;

  tick(dt: number, sm: StoreManager): void {
    this._timer -= dt;
    if (this._timer > 0) return;
    this._timer = SPAWN_INTERVAL;

    if (sm.queue.length >= MAX_QUEUE) return;

    const slot     = sm.queue.length;
    const order    = generateOrder();
    const customer = new Customer();
    const id       = ++this._seq;
    const ticket   = new OrderTicket(id, customer, order);
    ticket.queueSlot = slot;

    customer.arrive(order, pickCustomer(), slot);
    sm.tickets.set(id, ticket);
    sm.queue.push(id);
    sm.requestLine(ticket);
  }
}
