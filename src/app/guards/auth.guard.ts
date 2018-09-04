import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    // Logged in
    if (localStorage.getItem('user'))
      return true;

    // Not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
