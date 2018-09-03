import { Routes } from "@angular/router";
import { PanelComponent } from "./pages/panel/panel.component";
import { HomeComponent } from "./pages/panel/home/home.component";

export const ROUTES: Routes = [
  {
    path: "", component: PanelComponent,
    children: [
      { path: "", component: HomeComponent }
    ]
  }
]
