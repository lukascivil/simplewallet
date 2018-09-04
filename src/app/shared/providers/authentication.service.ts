import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  // Login
  login(username: string, password: string) {
    var promise = new Promise((resolve, reject) => {
      // Check if user exists
      let user = this.getUser(username, password);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        resolve(true);
      } else {
        resolve(false);
      }
    });
    return promise;
  }

  // Returns user data if exist
  private getUser(name, password): User {
    let users_database = localStorage.getItem("users");
    let users = users_database ? JSON.parse(users_database) : [];
    let searchuser: User = null;

    // Search on the database if the user exists
    users.forEach(user => {
      if (user.name == name && user.password == password) {
        searchuser = user;
        return false;
      }
      return
    });
    return searchuser;
  }

}
