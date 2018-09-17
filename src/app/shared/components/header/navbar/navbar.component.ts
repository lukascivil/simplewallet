import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { Market } from '../../../models/market.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() market: Market;
  @Input() user: User;
  @Input() dropdown;

  constructor() { }

  ngOnInit() {
  }

}
