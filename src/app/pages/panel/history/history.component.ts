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
    const user = this.userService.getUser();

    // Sort transactions by date
    user.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.transactions = user.transactions;
  }

}
