import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  // Currencies meta
  currencies = {
    bitcoin: { label: "BTC", icon: '<i class="fa fa-btc fa-3x amber-text" aria-hidden="true"></i>' },
    brita: { label: "BTA", icon: '<i class="fa fa-eercast fa-3x purple-text" aria-hidden="true"></i>' },
    real: { label: "BRL", icon: '<div class="brlmoney"> BRL</div>' }
  };

  // Sets the type of operation, first -> Currency to buy, second -> Payment Currency
  operationtype = {
    buy: { first: ["bitcoin", "brita"], second: ["real"] },
    sell: { first: ["bitcoin", "brita"], second: ["real"] }
  };

  // initiates new order Object
  order = new Order();

  // Current tab
  selectedtab: string = ""

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // Auto Init all Materialize Components
    M.AutoInit();
  }

  onTabClick(value) {
    this.selectedtab = value;
  }

}
