import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

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
