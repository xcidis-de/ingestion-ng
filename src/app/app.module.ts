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
import { BasicTextObjectDisplay } from './app-info-display/display-templates/text-object.component';
import { DescriptionListDisplay } from './app-info-display/display-templates/description-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AppQueryFormComponent,
    AppInfoDisplayComponent,
    PageNotFoundComponent,
    BasicTextObjectDisplay,
    DescriptionListDisplay
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [BasicTextObjectDisplay, DescriptionListDisplay],
  providers: [IngestionExternalHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
