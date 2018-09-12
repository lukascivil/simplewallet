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

  constructor() { }

  ngOnInit() {
  }

  // Add class to selected currency 
  onCurrencyClick(what: string, currency: string) {
    if (what == "first") {
      this.order.firstcurrency = currency;
    } else {
      this.order.secondcurrency = currency;
    }
  }
}
