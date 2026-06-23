import { STATE, ZONE } from './constants.js';
import { getNearbyInteractZone } from './tilemap.js';
import { generateOrder } from './order.js';
import { showPrompt, showCelebration } from './hud.js';
import { pickPersona, generateLine } from './dialogue.js';

const SPAWN_DELAY = 2.5;    // seconds after a customer leaves before next arrives
const SHAKE_DURATION = 5.0; // seconds the shaker runs after being loaded

// Maps state to the prompt shown when player is near each zone
const PROMPTS = {
  [STATE.CUSTOMER_WAITING]: { [ZONE.REGISTER]: 'Take Order' },
  [STATE.FETCHING_BASE]: {
    [ZONE.SHELF_WHITE]: 'Grab White Base',
    [ZONE.SHELF_GRAY]:  'Grab Gray Base',
    [ZONE.SHELF_DEEP]:  'Grab Deep Base',
  },
  [STATE.FETCHING_TINT]: {
    [ZONE.TINT_STATION]: 'Grab Tint',
  },
  [STATE.LOADING_SHAKER]: {
    [ZONE.SHAKER]: 'Load Shaker',
  },
  [STATE.CHECKING_OUT]: {
    [ZONE.REGISTER]: 'Check Out Customer',
  },
  // COLLECTING prompt is handled specially (depends on shaker timer)
  [STATE.HANDING_OFF]: {
    [ZONE.PICKUP]: 'Hand Off Paint',
  },
};

export class StateMachine {
  constructor(customer) {
    this.state = STATE.IDLE;
    this.order = null;
    this.customer = customer;
    this.score = 0;

    this._spawnTimer = 1.0; // quick first spawn
    this._celebrationTimer = 0;
    this._shakerTimer = 0;  // counts down independently while the shaker runs
    this._takingOrderTimer = 0;

    // Flash effects: [{ zone, alpha, timer }]
    this.flashZones = [];
  }

  update(dt, player) {
    this._updateFlashes(dt);

    // Shaker runs in the background, independent of player state,
    // so checkout can happen while the paint shakes.
    if (this._shakerTimer > 0) {
      this._shakerTimer = Math.max(0, this._shakerTimer - dt);
    }

    switch (this.state) {
      case STATE.IDLE:
        this._spawnTimer -= dt;
        if (this._spawnTimer <= 0) {
          this.order = generateOrder();
          this.customer.arrive(this.order, pickPersona());
          this.state = STATE.CUSTOMER_ARRIVING;
        }
        break;

      case STATE.CUSTOMER_ARRIVING:
        if (this.customer.state === 'WAITING') {
          this.state = STATE.CUSTOMER_WAITING;
          this._requestLine('ORDER'); // customer greets / places order
        }
        break;

      case STATE.TAKING_ORDER:
        this._takingOrderTimer -= dt;
        if (this._takingOrderTimer <= 0) {
          this.state = STATE.FETCHING_BASE;
        }
        break;

      case STATE.ORDER_COMPLETE:
        this._celebrationTimer -= dt;
        if (this._celebrationTimer <= 0) {
          showCelebration(false);
          this.customer.leave();
          this.state = STATE.CUSTOMER_LEAVING;
        }
        break;

      case STATE.CUSTOMER_LEAVING:
        if (this.customer.state === 'GONE') {
          this.state = STATE.IDLE;
          this._spawnTimer = SPAWN_DELAY;
          this.order = null;
          player.clearItems();
        }
        break;
    }

    // Update interaction prompt
    this._updatePrompt(player);
  }

  handleInteraction(player) {
    const nearZone = getNearbyInteractZone(player.x, player.y);
    if (!nearZone) return;

    switch (this.state) {
      case STATE.CUSTOMER_WAITING:
        if (nearZone === ZONE.REGISTER) {
          this._takingOrderTimer = 0.4;
          this.state = STATE.TAKING_ORDER;
        }
        break;

      case STATE.FETCHING_BASE: {
        const baseMap = {
          [ZONE.SHELF_WHITE]: 'WHITE',
          [ZONE.SHELF_GRAY]:  'GRAY',
          [ZONE.SHELF_DEEP]:  'DEEP',
        };
        const grabbed = baseMap[nearZone];
        if (grabbed) {
          if (grabbed === this.order.baseType) {
            player.heldBase = grabbed;
            this.state = STATE.FETCHING_TINT;
          } else {
            this._addFlash(nearZone);
          }
        }
        break;
      }

      case STATE.FETCHING_TINT:
        if (nearZone === ZONE.TINT_STATION && player.heldBase) {
          player.heldTint = this.order.tintCode;
          this.state = STATE.LOADING_SHAKER;
        }
        break;

      case STATE.LOADING_SHAKER:
        if (nearZone === ZONE.SHAKER) {
          // Drop the paint into the shaker; it starts running in the
          // background. Hands are now free to go check the customer out.
          this._shakerTimer = SHAKE_DURATION;
          player.heldBase = null;
          player.heldTint = null;
          this.state = STATE.CHECKING_OUT;
        }
        break;

      case STATE.CHECKING_OUT:
        if (nearZone === ZONE.REGISTER) {
          this.state = STATE.COLLECTING;
        }
        break;

      case STATE.COLLECTING:
        // Can only collect once the shaker has finished.
        if (nearZone === ZONE.SHAKER && this._shakerTimer <= 0) {
          player.heldMixedCan = this.order;
          this.state = STATE.HANDING_OFF;
        }
        break;

      case STATE.HANDING_OFF:
        if (nearZone === ZONE.PICKUP) {
          this.score++;
          showCelebration(true);
          this._celebrationTimer = 2.0;
          this.state = STATE.ORDER_COMPLETE;
          this._requestLine('PICKUP'); // customer reacts to their paint
        }
        break;
    }
  }

  get isShaking() {
    return this._shakerTimer > 0;
  }

  // Shaker has paint in it and has finished — ready to be collected.
  get shakerReady() {
    return this._shakerTimer <= 0 &&
      (this.state === STATE.CHECKING_OUT || this.state === STATE.COLLECTING);
  }

  // Fire off an async LLM line for the current customer/order. Guarded by
  // reqId so a slow response for a customer who already left is discarded.
  _requestLine(phase) {
    const c = this.customer;
    if (!c.persona || !this.order) return;
    const myReq = c.reqId;
    c.speech = { text: '', state: 'loading' };
    generateLine(c.persona, phase, this.order).then(line => {
      if (c.reqId === myReq) {
        c.speech = { text: line, state: 'shown' };
      }
    });
  }

  _addFlash(zone) {
    this.flashZones = this.flashZones.filter(f => f.zone !== zone);
    this.flashZones.push({ zone, alpha: 0.55, timer: 0.5 });
  }

  _updateFlashes(dt) {
    this.flashZones = this.flashZones
      .map(f => ({ ...f, timer: f.timer - dt, alpha: Math.max(0, (f.timer - dt) / 0.5 * 0.55) }))
      .filter(f => f.timer > 0);
  }

  _updatePrompt(player) {
    const nearZone = getNearbyInteractZone(player.x, player.y);

    // Collecting from the shaker depends on whether it has finished.
    if (this.state === STATE.COLLECTING && nearZone === ZONE.SHAKER) {
      if (this._shakerTimer > 0) {
        showPrompt(`Shaking... ${Math.ceil(this._shakerTimer)}s`, false);
      } else {
        showPrompt('Collect Paint', true);
      }
      return;
    }

    const statePrompts = PROMPTS[this.state];
    if (statePrompts && nearZone && statePrompts[nearZone]) {
      showPrompt(statePrompts[nearZone]);
    } else {
      showPrompt(null);
    }
  }
}
