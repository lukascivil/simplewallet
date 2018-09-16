import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { MarketService } from '../../providers/market.service';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // User Real
  brluser: number = undefined;

  // Bitcoin in BRL
  bitcoinbrl: number = undefined;
  // User original Bitcoin
  bitcoinuser: number = undefined;
  // Bitcoin  buy/sell provided by API
  bitcoinbuy: number = undefined;
  bitcoinsell: number = undefined;

  // Brita in BRL
  britabrl: number = undefined;
  // User original Brita
  britauser: number = undefined;
  // Dropdown
  dropdown = "BRL/BTC"

  // Total in BRL
  totalbrl: number = 0;

  constructor(private market: MarketService, private userService: UserService) { }

  ngOnInit() {
    // Get current user
    let user = this.userService.getUser();

    // Take the money (brl), bitcoin, brita that the user has in the database
    this.brluser = user.money_brl;
    this.bitcoinuser = user.cryptocoins.bitcoin;
    this.britauser = user.cryptocoins.brita;

    // Takes the current bitcoin value that is provided by API
    this.market.bitcoincurrent.subscribe(message => {
      if (message.buy !== undefined) {
        // Calculate the value of the bitcoin in brl
        this.bitcoinbrl = this.bitcoinuser * Number(message.buy);
        this.bitcoinbuy = Number(message.buy)
        this.bitcoinsell = Number(message.sell)
      }
    });

    // Takes the current britas value that is provided by API
    this.market.britacurrent.subscribe(message => {
      if (message.cotacaoCompra !== undefined) {
        // Calculate the value of the britas in brl
        this.britabrl = this.britauser * message.cotacaoCompra;
      }
    });
  }

  ondropdownClick(value) {
    this.dropdown = value;
  }

  ngAfterContentInit() {
    // Auto Init all Materialize Components
    M.AutoInit();
  }

}
