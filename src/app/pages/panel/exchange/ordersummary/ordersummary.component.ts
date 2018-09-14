import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../../shared/models/order.model';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss']
})
export class OrdersummaryComponent implements OnInit {

  @Input() order: Order;
  @Input() currencies;

  constructor() { }

  ngOnInit() {
  }

}
