import { User } from "../../../shared/models/user.model";
import { Order } from "../../../shared/models/order.model";
import { UserService } from "../../../shared/providers/user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ExchangeService {

  constructor(private userService: UserService) { }

  // Send the order
  sendOrder(order: Order) {
    var promise = new Promise((resolve, reject) => {
      // Get current user
      let user: User = JSON.parse(localStorage.getItem("user"));

      // Make the transaction, on: false -> transaction canceled, true -> transaction accepted
      let transactionstate: boolean = this.tryMakeTransaction(order, user);

      if (transactionstate)
        resolve()
      else
        reject()
    });
    return promise;
  }

  // Make a transaction with the order
  private tryMakeTransaction(order: Order, user: User): boolean {
    if (order.type == "buy") {
      if ((order.firstcurrency == "bitcoin" || order.firstcurrency == "brita") && order.secondcurrency == "real") {
        // Current variables holds the value of the current money and currency amount in the wallet for the calculation
        let currentmoney = user.money_brl
        let currentamount = user.cryptocoins[order.firstcurrency]

        // Calculate the current value with the operation
        currentmoney -= order.getTotal();
        currentamount += order.getAmount();

        // If current is less than 0, cancel the operation
        if (currentmoney < 0)
          return false;

        // Make the operation
        user.money_brl = currentmoney
        user.cryptocoins[order.firstcurrency] = currentamount

        // Add transaction to history
        user.transactions.push(order);

        // Update user data
        this.userService.updateUser(user)
        return true;
      }
    }
    return false;
  }

}