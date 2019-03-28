import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppQueryFormComponent } from './app-query-form/app-query-form.component';
import { AppInfoDisplayComponent } from './app-info-display/app-info-display.component';

const routes: Routes = [
  {path: 'query', component: AppQueryFormComponent},
  {path: 'information/:provider/:id', component: AppInfoDisplayComponent},
  {path: 'information', component: AppInfoDisplayComponent},
  {path: 'visualization', component: PageNotFoundComponent},
  {path: 'resources', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/query', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
