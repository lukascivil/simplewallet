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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PanelComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
