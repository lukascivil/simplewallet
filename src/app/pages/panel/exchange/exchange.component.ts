import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { Order } from '../../../shared/models/order.model';
import { MarketService } from '../../../shared/providers/market.service';
import { UserService } from '../../../shared/providers/user.service';

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

  // Brita, provided by the API
  britabuy = undefined;
  // Bitcoin, provided by the API
  bitcoinbuy = undefined;
  // User Real
  brluser = undefined;

  // initiates new order Object
  order = new Order();

  // Current tab
  selectedtab: string = ""

  constructor(private market: MarketService, private userService: UserService) {
  }

  ngOnInit() {
    // Get current user
    this.userService.usercurrent.subscribe(user => {
      // Take the money (brl), that the user has in the database
      this.brluser = user.money_brl;
    });

    // Takes the current bitcoin value that is provided by API
    this.market.bitcoincurrent.subscribe(message => {
      if (message.buy !== undefined) {
        // Calculate the value of the bitcoin in brl
        this.bitcoinbuy = Number(message.buy);
      }
    });

    // Takes the current britas value that is provided by API
    this.market.britacurrent.subscribe(message => {
      if (message.cotacaoCompra !== undefined) {
        // Calculate the value of the britas in brl
        this.britabuy = message.cotacaoCompra;
      }
    });
  }

  ngAfterContentInit() {
    // Auto Init all Materialize Components
    M.AutoInit();
  }

  onTabClick(value) {
    this.selectedtab = value;
  }

}
