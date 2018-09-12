import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
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
}
