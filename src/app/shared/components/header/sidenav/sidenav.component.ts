import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../../../models/market.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() market: Market
  @Input() user: User;
  @Input() dropdown;

  constructor() { }

  ngOnInit() {
  }

}
