import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../shared/providers/market.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private market: MarketService) { }

  ngOnInit() {
    // Init market Service
    this.market.getBitcoin().subscribe()
    this.market.getBrita().subscribe()
  }

}
