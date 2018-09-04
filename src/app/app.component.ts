import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private elementRef: ElementRef) {
    this.routeEvent(this.router);
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url.includes("login") || e.url.includes("register")) // Login or Register backgroundcolor
          this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2a6242';
        else // panel backgroundcolor
          this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e8f5e9';
      }
    });
  }
}
