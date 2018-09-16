import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { MarketService } from '../../providers/market.service';
import { UserService } from '../../providers/user.service';
import { User } from '../../models/user.model';
import { Market } from '../../models/market.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Value of currencies on the market provided by the API
  market: Market;

  // User data
  user: User;

  // Dropdown
  dropdown = "BRL/BTC"

  constructor(private marketService: MarketService, private userService: UserService) {
    this.market = new Market();
  }

  ngOnInit() {
    // Get current user
    this.userService.usercurrent.subscribe(user => {
      this.user = user;
    });

    // Takes the current bitcoin value that is provided by API
    this.marketService.bitcoincurrent.subscribe(message => {
      this.market.bitcoin.buy = Number(message.buy)
      this.market.bitcoin.sell = Number(message.sell)
    });

    // Takes the current britas value that is provided by API
    this.marketService.britacurrent.subscribe(message => {
      this.market.brita.buy = Number(message.cotacaoCompra)
      this.market.brita.sell = Number(message.cotacaoVenda)
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
