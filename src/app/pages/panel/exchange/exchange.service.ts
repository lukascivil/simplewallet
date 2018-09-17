import { User } from '../../../shared/models/user.model';
import { Order } from '../../../shared/models/order.model';
import { UserService } from '../../../shared/providers/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ExchangeService {

  constructor(private userService: UserService) { }

  // Send the order
  sendOrder(order: Order) {
    return new Promise((resolve, reject) => {
      // Get current user
      const user: User = JSON.parse(localStorage.getItem('user'));

      // Make the transaction, on: false -> transaction canceled, true -> transaction accepted
      const transactionstate: boolean = this.tryMakeTransaction(order, user);

      if (transactionstate) {
        resolve();
      } else {
        reject();
      }
    });
  }

  // Make a transaction with the order
  private tryMakeTransaction(order: Order, user: User): boolean {
    // Check if currencies are valid
    if ((order.firstcurrency === 'bitcoin' || order.firstcurrency === 'brita') && order.secondcurrency === 'real') {
      // Current variables holds the value of the current money and currency amount in the wallet for the calculation
      let currentmoney = user.money_brl;
      let currentamount = user.cryptocoins[order.firstcurrency];

      // Calculate the current value with the operation type: buy or sell
      if (order.type === 'buy') {
        currentmoney = +(currentmoney - order.getTotal()).toFixed(8);
        currentamount = +(currentamount + order.getAmount()).toFixed(8);
      } else if (order.type === 'sell') {
        currentmoney = +(currentmoney + order.getTotal()).toFixed(8);
        currentamount = +(currentamount - order.getAmount()).toFixed(8);
      } else {
        // without the defined type {buy, sell}, cancel the operation
        return false;
      }

      // If current is less than 0, cancel the operation
      if (currentmoney < 0) {
        return false;
      }

      // Make the operation
      user.money_brl = currentmoney;
      user.cryptocoins[order.firstcurrency] = currentamount;

      // Add transaction to history
      user.transactions.push(order);

      // Update user data
      this.userService.updateUser(user, true);
      return true;
    }
    return false;
  }

}