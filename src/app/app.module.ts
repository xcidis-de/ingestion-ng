import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CrapomeExpComponent, SafePipe } from './app-info-display/display-templates/crapome/sub-components/experiment-list.component';
import { CrapomeExpProtein } from './app-info-display/display-templates/crapome/sub-components/crapome-exp-prot.component';
import { CrapomeProteinList } from './app-info-display/display-templates/crapome/sub-components/protein-list.component'
import { SpinnerComponent } from './spinner/spinner.component';
import { CrapomeUploadComponent } from './crapome-main/upload/crapome-upload/crapome-upload.component';
//Services
import { IngestionExternalHttpService } from 'src/services/api-service/ingestion.http.service';
import { CrapomeDataInjectionService } from './app-info-display/display-templates/crapome/injection-services/crapome-injection.service';
import { CacheRouteReuseStrategy } from '../services/routeCache/cache-router.service';
import { RouteHistoryService } from '../services/routeCache/route-history.service';
import { UserLoginComponent } from './user-login-component/user-login-component.component';
import { UserAuthService } from 'src/services/logged-in/user.service';
import { LoggedInGuard } from 'src/services/logged-in/logged.service';

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
    SafePipe,
    SpinnerComponent,
    CrapomeUploadComponent,
    UserLoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [BasicTextObjectDisplay, DescriptionListDisplay, CrapomeListDisplay, CrapomeExpProtein],
  providers: [
    IngestionExternalHttpService, 
    CrapomeDataInjectionService,
    RouteHistoryService,
    CacheRouteReuseStrategy,
    UserAuthService,
    LoggedInGuard
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
