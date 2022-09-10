import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./components/start/start.component";
import {LoginComponent} from "./components/login/login.component";
import {ConnectServerComponent} from "./components/connect-server/connect-server.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {StartGuard} from "./guards/start.guard";
import {AuthGuard} from "./guards/auth.guard.service";
import {RedirectHandlerComponent} from "./components/redirect-handler/redirect-handler.component";
import {AuthorizationComponent} from "./components/authorization/authorization.component";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [StartGuard] ,
    children: [
      {
        path: 'start', component: StartComponent,
      },
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: 'redirect', component: RedirectHandlerComponent,
      },
      {
        path: 'connect', component: ConnectServerComponent,
      },

    ]
  },
  {
    path: '',
    canActivateChild: [AuthGuard] ,
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'authorize', component: AuthorizationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
