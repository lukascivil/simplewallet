import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UserService) { }

  // Login
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      // Check if user exists
      const user = this.getUser(username, password);

      if (user) {
        this.userService.updateUser(user);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  // Logout
  logout() {
    this.userService.updateUser(null);
  }

  // Returns user data if exist
  private getUser(name, password): User {
    const users_database = localStorage.getItem('users');
    const users = users_database ? JSON.parse(users_database) : [];
    let searchuser: User = null;

    // Search on the database if the user exists
    users.forEach(user => {
      if (user.name === name && user.password === password) {
        searchuser = user;
        return false;
      }
      return;
    });
    return searchuser;
  }

}
