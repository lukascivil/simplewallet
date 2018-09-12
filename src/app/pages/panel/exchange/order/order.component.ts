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
  @Output() onSubmitOrderClick = new EventEmitter();

  brlusermax: string = "0%";

  constructor() { }

  ngOnInit() {
  }

  updateProgressMax() {
    let ruleofthree = (this.order.getTotal() * 100) / this.brluser;
    this.brlusermax = String(ruleofthree > 100 ? 100 : ruleofthree) + "%";
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
    this.updateProgressMax();
  }

  onTotalInputKeyup(value) {
    this.order.setTotal(Number(value));
    this.updateProgressMax();
  }

  emitonSubmitOrderClickEvent() {
    this.onSubmitOrderClick.emit();
  }

}
