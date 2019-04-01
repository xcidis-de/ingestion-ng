import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';
import _ from 'lodash';
import { InfoDisplayInterface } from './display-templates/data-display.interface'
import { BasicTextObjectDisplay } from './display-templates/text-object.component';
import { DescriptionListDisplay } from './display-templates/description-list.component';



@Component({
  selector: 'app-app-info-display',
  templateUrl: './app-info-display.component.html',
  styleUrls: ['./app-info-display.component.scss']
})
export class AppInfoDisplayComponent implements OnInit {
  @ViewChild("infoDisplay", {read: ViewContainerRef}) infoTemplate: ViewContainerRef;

  data: any; //some interface
  basic: boolean = true;

  constructor(
    private observe: IngestionExternalHttpService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ){
  }
  
  subscription(){
    this.observe.subject.subscribe((data)=>{
      this.displayItems(data);
    })
  }
  
  displayItems(data){
    let newComponent;
    let pageable: boolean = false;
    if(_.isArray(data)){
      pageable = _.get(data[0], 'headers.page_tokens[0]') ? true : false;
      newComponent = this.componentFactoryResolver.resolveComponentFactory(DescriptionListDisplay);
    }else{
      data = Object.values(data.metadata);
      newComponent = this.componentFactoryResolver.resolveComponentFactory(BasicTextObjectDisplay)
    }

    let viewReference = this.infoTemplate
    viewReference.clear();

    let component = viewReference.createComponent(newComponent);
    (<InfoDisplayInterface>component.instance).data = data;
    (<InfoDisplayInterface>component.instance).pageable = pageable;
  }

  ngOnInit() {
    this.subscription();
    
  }
  
}
