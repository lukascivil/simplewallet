import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from "./app.routes";
import { PanelComponent } from './pages/panel/panel.component';
import { HomeComponent } from './pages/panel/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
