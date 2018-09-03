import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(username: string, password: string) {
    var promise = new Promise((resolve, reject) => {
      // Simulate authentication
      resolve(true);
    });
    return promise;
  }

}
