import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from "./app.routes";
import { HeaderComponent } from './shared/components/header/header.component';
import { PanelComponent } from './pages/panel/panel.component';
import { HomeComponent } from './pages/panel/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './shared/providers/authentication.service';
import { registerComponent } from './pages/register/register.component';
import { UserService } from './shared/providers/user.service';
import { Error404Component } from './pages/error404/error404.component';
import { MarketService } from './shared/providers/market.service';
import { HttpModule } from '@angular/http';
import { ExchangeComponent } from './pages/panel/exchange/exchange.component';
import { OrderComponent } from './pages/panel/exchange/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PanelComponent,
    HomeComponent,
    LoginComponent,
    registerComponent,
    Error404Component,
    ExchangeComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthenticationService, UserService, MarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }