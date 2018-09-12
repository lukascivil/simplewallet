export class Order {
  id: string;
  type: string;
  firstcurrency: string;
  secondcurrency: string;
  amount: number;
  currentbase: number;
  total: number;
  date: string;

  setCurrentbase(value: number) {
    this.currentbase = value;
    if (this.amount != undefined)
      this.total = this.amount * this.currentbase;
  }
}