import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppQueryFormComponent } from './app-query-form/app-query-form.component';
import { AppInfoDisplayComponent } from './app-info-display/app-info-display.component';
import { CrapomeMainComponent } from './crapome-main/crapome-main.component';
import { CrapomeExpProtein } from './app-info-display/display-templates/crapome/sub-components/crapome-exp-prot.component';


const routes: Routes = [
  {path: 'query', component: AppQueryFormComponent},
  {path: 'information/:provider/:id', component: AppInfoDisplayComponent},
  {path: 'information/crapome/:exp/:gene', component: CrapomeExpProtein},
  {
    path: 'information/:hash', 
    component: AppInfoDisplayComponent, 
    runGuardsAndResolvers: `always`
  },
  { path: 'crapome', component: CrapomeMainComponent },
  { path: '**', redirectTo: '/query', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
