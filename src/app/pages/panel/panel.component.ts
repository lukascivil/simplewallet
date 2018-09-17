import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../shared/providers/market.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  private _bitcoinSubscription;
  private _britaSubscription;

  constructor(private market: MarketService) { }

  ngOnInit() {
    // Init market Service
    this._bitcoinSubscription = this.market.getBitcoin().subscribe()
    this._britaSubscription = this.market.getBrita().subscribe()
  }

  // Unsubscribe all subscriptions
  ngOnDestroy() {
    this._bitcoinSubscription.unsubscribe();
    this._britaSubscription.unsubscribe();
  }

}
