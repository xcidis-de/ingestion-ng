import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppQueryFormComponent } from './app-query-form/app-query-form.component';
import { AppInfoDisplayComponent } from './app-info-display/app-info-display.component';
import { CrapomeMainComponent } from './crapome-main/crapome-main.component';
import { LoggedInGuard } from '../services/logged-in/logged.service';
import { UserLoginComponent } from './user-login-component/user-login-component.component';

const routes: Routes = [
  { path: 'query', 
    component: AppQueryFormComponent,
    canActivate: [LoggedInGuard] },
  { path: 'information/:provider',
    component: AppInfoDisplayComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: ':id', component: AppInfoDisplayComponent },
      { path: ':exp/:gene', component: AppInfoDisplayComponent },
    ]},
  { path: 'information/:hash', component: AppInfoDisplayComponent },
  { path: 'crapome', 
    component: CrapomeMainComponent,
    canActivate: [LoggedInGuard] },
  // { path: '**', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
