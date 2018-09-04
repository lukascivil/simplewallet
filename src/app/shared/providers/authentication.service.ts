import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(username: string, password: string) {
    var promise = new Promise((resolve, reject) => {
    });
    return promise;
  }

}
