export class Order {
  id: string;
  type: string;
  firstcurrency: string;
  secondcurrency: string;
  private amount: number;
  private currentbase: number;
  private total: number;
  date: string;

  setAmount(value: number) {
    this.amount = value;
    if (this.currentbase != undefined)
      this.total = this.amount * this.currentbase;
  }

  getAmount(): number {
    return this.amount
  }

  setCurrentbase(value: number) {
    this.currentbase = value;
    if (this.amount != undefined)
      this.total = this.amount * this.currentbase;
  }

  getCurrentbase(): number {
    return this.currentbase
  }

  setTotal(value: number) {
    this.total = value
    if (this.currentbase) {
      this.amount = this.total / this.currentbase;
    } else {
      throw "Error on currentbase value";
    }
  }

  getTotal(): number {
    return this.total;
  }

  isValid(): boolean {
    if (this.id && this.type && this.firstcurrency &&
      this.secondcurrency && this.secondcurrency && this.amount &&
      this.currentbase && this.total && this.date) {
      return true;
    }
    return false;
  }
}