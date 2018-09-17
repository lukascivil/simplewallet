import { Routes } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';
import { HomeComponent } from './pages/panel/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';
import { ExchangeComponent } from './pages/panel/exchange/exchange.component';
import { HistoryComponent } from './pages/panel/history/history.component';

export const ROUTES: Routes = [
  {
    path: '', component: PanelComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'exchange', component: ExchangeComponent },
      { path: 'history', component: HistoryComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: Error404Component }
];
