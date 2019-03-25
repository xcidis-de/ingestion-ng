import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AppQueryFormComponent } from './app-query-form/app-query-form.component';
import { AppInfoDisplayComponent } from './app-info-display/app-info-display.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AppQueryFormComponent,
    AppInfoDisplayComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [IngestionExternalHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
