import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../shared/providers/market.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  bitcoin: any;
  brita: any;

  constructor(private market: MarketService) {
  }

  ngOnInit() {
    this.market.getBitcoin().subscribe(bitcoin => this.bitcoin = bitcoin)
    this.market.getBrita().subscribe(brita => this.brita = brita)
  }

}
