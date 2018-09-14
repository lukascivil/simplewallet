import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/providers/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  transactions = undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Get current user
    let user = this.userService.getUser();
    this.transactions = user.transactions
  }

}
