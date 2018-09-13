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
  @Input() britabuy;
  @Input() bitcoinbuy;
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

  // Add class to selected currency 
  onCurrencyClick(what: string, currency: string) {
    if (what == "first") {
      this.order.firstcurrency = currency;
      if (currency == "brita")
        this.order.setCurrentbase(this.britabuy);
      else if (currency == "bitcoin")
        this.order.setCurrentbase(this.bitcoinbuy);
    } else {
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
