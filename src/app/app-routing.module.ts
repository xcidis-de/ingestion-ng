import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppQueryFormComponent } from './app-query-form/app-query-form.component';
import { AppInfoDisplayComponent } from './app-info-display/app-info-display.component';
import { CrapomeMainComponent } from './crapome-main/crapome-main.component';
import { LoggedInGuard } from '../services/logged-in/logged.service';
import { UserLoginComponent } from './user-login-component/user-login-component.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { SidePanelTabComponent } from './side-panel/side-panel-tab/side-panel-tab.component';

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
    canActivate: [LoggedInGuard] 
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'open', component: SidePanelComponent, outlet: 'side-panel' },
  { path: 'closed', component: SidePanelTabComponent, outlet: 'side-panel' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
