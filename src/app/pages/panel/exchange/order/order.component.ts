import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { Order } from '../../../../shared/models/order.model';

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
  @Input() order: Order;
  @Input() market;
  @Input() user: User;
  @Output() SubmitOrderClick = new EventEmitter();

  // Lowest value for an order
  lowordervalue = 0.01;

  constructor() { }

  ngOnInit() {
  }

  progressValue(): string {
    // Desired quantity
    let wantedquantity;
    // Maximum quantity
    let maxquantity;

    if (this.order.type === 'buy') {
      wantedquantity = this.order.getTotal();
      maxquantity = this.user.money_brl;
    } else {
      wantedquantity = this.order.getAmount();
      maxquantity = this.user.cryptocoins[this.order.firstcurrency];
    }

    // calculates the percentage of required value and return
    const ruleofthree = (wantedquantity ? ((wantedquantity * 100) / maxquantity) : 0);
    return String(wantedquantity > maxquantity ? 101 : ruleofthree) + '%';
  }

  // Add class to selected currency and set the currentbase
  onCurrencyClick(what: string, currency: string) {
    if (what === 'first') {
      // Currency current Base
      let base;

      // Set firstcurrency name
      this.order.firstcurrency = currency;

      if (currency === 'brita') {
        if (this.order.type === 'buy') {
          base = this.market.brita.sell;
        } else {
          base = this.market.brita.buy;
        }
      } else if (currency === 'bitcoin') {
        if (this.order.type === 'buy') {
          base = this.market.bitcoin.sell;
        } else {
          base = this.market.bitcoin.buy;
        }
      }

      this.order.setCurrentbase(base);
    } else {
      // Set secondcurrency name
      this.order.secondcurrency = currency;
    }
  }

  onChangeAmount(value) {
    this.order.setAmount(Number(value));
  }

  onChangeTotal(value) {
    this.order.setTotal(Number(value));
  }

  emitSubmitOrderClickEvent() {
    this.SubmitOrderClick.emit();
  }

}
