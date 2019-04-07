import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { IngestionExternalHttpService } from 'src/services/api-service/ingestion.http.service';
import _ from 'lodash';
import { InfoDisplayInterface } from './display-templates/pubchem/data-display.interface'
import { BasicTextObjectDisplay } from './display-templates/pubchem/text-object.component';
import { DescriptionListDisplay } from './display-templates/pubchem/description-list.component';
import { CrapomeListDisplay } from './display-templates/crapome/crapome-list.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrapomeExpProtein} from './display-templates/crapome/crapome-exp-prot.component';

@Component({
  selector: 'app-app-info-display',
  templateUrl: './app-info-display.component.html',
  styleUrls: ['./app-info-display.component.scss']
})
export class AppInfoDisplayComponent implements OnInit {
  @ViewChild("infoDisplay", {read: ViewContainerRef}) infoTemplate: ViewContainerRef;
  sub: Observable<any>;
  data: boolean = false;

  constructor(
    private observe: IngestionExternalHttpService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ){
  }
  
  subscription(){
    this.observe.subject.subscribe((data)=>{
      this.displayItems(data);
    })
  }
  
  displayItems(data){
    let newComponent;
    let viewReference: ViewContainerRef = this.infoTemplate
    viewReference.clear();
    if(_.isArray(data)){
      for(const item of data){
        if(item.provider === 'pubchem'){
          newComponent = this.componentFactoryResolver.resolveComponentFactory(DescriptionListDisplay);
        }else if(item.provider === 'crapome'){
          newComponent = this.componentFactoryResolver.resolveComponentFactory(CrapomeListDisplay);
        }
        let component = viewReference.createComponent(newComponent);
        (<InfoDisplayInterface>component.instance).data = item
      }
    }else{
      if(data.provider === 'pubchem'){
        newComponent = this.componentFactoryResolver.resolveComponentFactory(BasicTextObjectDisplay);
      }else if(data.provider === 'crapome'){
        newComponent = this.componentFactoryResolver.resolveComponentFactory(CrapomeExpProtein);
      }
      let component = viewReference.createComponent(newComponent);
      (<InfoDisplayInterface>component.instance).data = Object.values(data.metadata);
    }

    this.router.navigateByUrl('/information');
  }

  ngOnInit() {
    this.subscription();
  }

}
