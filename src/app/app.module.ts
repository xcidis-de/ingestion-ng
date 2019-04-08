import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AppQueryFormComponent } from './app-query-form/app-query-form.component';
import { AppInfoDisplayComponent } from './app-info-display/app-info-display.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BasicTextObjectDisplay } from './app-info-display/display-templates/pubchem/text-object.component';
import { DescriptionListDisplay } from './app-info-display/display-templates/pubchem/description-list.component';
import { CrapomeListDisplay } from './app-info-display/display-templates/crapome/crapome-list.component';
import { CrapomeMainComponent } from './crapome-main/crapome-main.component';
import { CrapomeExpComponent, SafePipe } from './app-info-display/display-templates/crapome/experiment-list.component';
import { CrapomeExpProtein } from './app-info-display/display-templates/crapome/crapome-exp-prot.component';
import { CrapomeProteinList } from './app-info-display/display-templates/crapome/protein-list.component'
//Services
import { IngestionExternalHttpService } from 'src/services/api-service/ingestion.http.service';
import { CrapomeDataInjectionService } from './app-info-display/display-templates/injection-services/crapome-injection.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AppQueryFormComponent,
    AppInfoDisplayComponent,
    PageNotFoundComponent,
    BasicTextObjectDisplay,
    DescriptionListDisplay,
    CrapomeListDisplay,
    CrapomeMainComponent,
    CrapomeExpComponent,
    CrapomeExpProtein,
    CrapomeProteinList,
    SafePipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [BasicTextObjectDisplay, DescriptionListDisplay, CrapomeListDisplay, CrapomeExpProtein],
  providers: [IngestionExternalHttpService, CrapomeDataInjectionService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
