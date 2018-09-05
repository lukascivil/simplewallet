import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from '../../../shared/providers/market.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../shared/providers/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Brl
  brluser: number = undefined;

  // Bitcoin
  bitcoinbrl: number = undefined;
  bitcoinuser: number = undefined;

  // Brita
  britabrl: number = undefined;
  britauser: number = undefined;

  // Total
  totalbrl: number = 0;

  constructor(private market: MarketService, public title: Title, private userService: UserService) {
    // Set the page title
    title.setTitle("Dashboard");
  }

  ngOnInit() {
    // Take the money, bitcoin, brita that the user has in the database
    this.brluser = this.userService.getUser().money_brl;
    this.bitcoinuser = this.userService.getUser().cryptocoins.bitcoin;
    this.britauser = this.userService.getUser().cryptocoins.brita;

    // Takes the current bitcoin value that is provided by API
    this.market.bitcoincurrent.subscribe(message => {
      if (message.buy !== undefined) {
        // Calculate the value of the bitcoin in brl
        this.bitcoinbrl = this.britauser * Number(message.buy);
        // Calculate total
        this.calculateTotalMoney();
      }
    });

    // Takes the current britas value that is provided by API
    this.market.britacurrent.subscribe(message => {
      if (message.cotacaoCompra !== undefined) {
        // Calculate the value of the britas in brl
        this.britabrl = this.britauser * Number(message.cotacaoCompra);
        // Calculate total
        this.calculateTotalMoney();
      }
    });
  }

  // Calculates the total value of currencies in brl
  calculateTotalMoney() {
    // Only calculates if the value of the coins is set
    if (this.bitcoinbrl != undefined && this.britabrl != undefined)
      this.totalbrl = this.bitcoinbrl + this.britabrl + this.brluser;
  }

}
