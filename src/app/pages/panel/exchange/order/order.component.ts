import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() type: string;
  @Input() first;
  @Input() second;
  @Input() currencies;
  @Input() order;
  @Input() market;
  @Input() brluser;
  @Input() currenciesuser;
  @Output() onSubmitOrderClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  progressValue(): string {
    // Desired quantity
    let wantedquantity;
    // Maximum quantity
    let maxquantity;

    if (this.order.type == "buy") {
      wantedquantity = this.order.getTotal();
      maxquantity = this.brluser;
    } else {
      wantedquantity = this.order.getAmount();
      maxquantity = this.currenciesuser[this.order.firstcurrency];
    }

    // calculates the percentage of required value and return
    let ruleofthree = (wantedquantity ? ((wantedquantity * 100) / maxquantity) : 0);
    return String(ruleofthree > 100 ? 100 : ruleofthree) + "%";
  }

  // Add class to selected currency and set the currentbase
  onCurrencyClick(what: string, currency: string) {
    if (what == "first") {
      let base;

      // Set firstcurrency name
      this.order.firstcurrency = currency;

      if (currency == "brita") {
        if (this.order.type == "buy")
          base = this.market.brita.sell;
        else
          base = this.market.brita.buy;
      } else if (currency == "bitcoin") {
        if (this.order.type == "buy")
          base = this.market.bitcoin.sell;
        else
          base = this.market.bitcoin.buy;
      }

      this.order.setCurrentbase(base);
    } else {
      // Set secondcurrency name
      this.order.secondcurrency = currency;
    }
  }

  onAmountInputKeyup(value) {
    this.order.setAmount(Number(value));
  }

  onTotalInputKeyup(value) {
    this.order.setTotal(Number(value));
  }

  emitonSubmitOrderClickEvent() {
    this.onSubmitOrderClick.emit();
  }

}
