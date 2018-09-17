import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as M from 'materialize-css';
import { Order } from '../../../shared/models/order.model';
import { MarketService } from '../../../shared/providers/market.service';
import { UserService } from '../../../shared/providers/user.service';
import { ExchangeService } from './exchange.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { User } from '../../../shared/models/user.model';
import { Market } from '../../../shared/models/market.model';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit, AfterContentInit, OnDestroy {

  // Currencies meta
  currencies = {
    bitcoin: { label: 'BTC', icon: '<i class="fa fa-btc fa-3x amber-text" aria-hidden="true"></i>' },
    brita: { label: 'BTA', icon: '<i class="fa fa-eercast fa-3x purple-text" aria-hidden="true"></i>' },
    real: { label: 'BRL', icon: '<i class="fa fa-money fa-3x stronegreen-text" aria-hidden="true"></i>' }
  };

  // Sets the type of operation, first -> Currency to buy, second -> Payment Currency
  operationtype = {
    buy: { first: ['bitcoin', 'brita'], second: ['real'] },
    sell: { first: ['bitcoin', 'brita'], second: ['real'] }
  };

  // Value of currencies on the market provided by the API
  market: Market;

  // User data
  user: User;

  // initiates new order Object
  order: Order;

  // Current tab
  selectedtab = '';

  // Subscriptions
  private _userSubscription;
  private _bitcoinSubscription;
  private _britaSubscription;

  constructor(private marketService: MarketService, private userService: UserService, private exchangeService: ExchangeService, private modalService: ModalService) {
    this.market = new Market();
    this.order = new Order();
    // Set Default Operation type
    this.selectedtab = 'buy';
    this.order.type = 'buy';
  }

  ngOnInit() {
    // Get current user
    this._userSubscription = this.userService.usercurrent.subscribe(user => {
      this.user = user;
    });

    // Takes the current bitcoin value that is provided by API
    this._bitcoinSubscription = this.marketService.bitcoincurrent.subscribe(message => {
      this.market.bitcoin.buy = Number(message.buy);
      this.market.bitcoin.sell = Number(message.sell);
    });

    // Takes the current britas value that is provided by API
    this._britaSubscription = this.marketService.britacurrent.subscribe(message => {
      this.market.brita.buy = Number(message.cotacaoCompra);
      this.market.brita.sell = Number(message.cotacaoVenda);
    });
  }

  // Unsubscribe all subscriptions
  ngOnDestroy() {
    this._userSubscription.unsubscribe();
    this._bitcoinSubscription.unsubscribe();
    this._britaSubscription.unsubscribe();
  }

  ngAfterContentInit() {
    // Auto Init all Materialize Components
    M.AutoInit();
  }

  resetOrder() {
    // Reset the order
    this.order = new Order();
    // Set Default Operation type
    this.order.type = this.selectedtab;
  }

  TabClick(value) {
    this.selectedtab = value;
    this.resetOrder();
  }

  SubmitOrderClick() {
    // Set the order date/timestamp
    this.order.date = Date.now();

    // If the order is complete, continue
    if (this.order.isValid()) {
      // Send the order to make the transaction
      this.exchangeService.sendOrder(this.order)
        .then(() => { // Success
          this.modalService.open({ header: 'Exchange', content: 'Successful operation!' });
          this.resetOrder();
        })
        .catch(() => { // Error
          this.modalService.open({ header: 'Exchange', content: 'Error: while performing operation! Please Try again later' });
        });
    } else {
      this.modalService.open({ header: 'Exchange', content: 'Error: Invalid Order!' });
    }
  }

}
