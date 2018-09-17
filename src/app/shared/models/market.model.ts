export class Market {
  bitcoin: { buy: number, sell: number };
  brita: { buy: number, sell: number };

  constructor() {
    this.bitcoin = { buy: undefined, sell: undefined };
    this.brita = { buy: undefined, sell: undefined };
  }
}