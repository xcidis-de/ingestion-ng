import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import _ from 'lodash';
import { InfoDisplayDirective } from './app-info.directive';
import { BasicTextObjectDisplay } from './display-templates/text-object.component';


@Component({
  selector: 'app-app-info-display',
  templateUrl: './app-info-display.component.html',
  styleUrls: ['./app-info-display.component.scss']
})
export class AppInfoDisplayComponent implements OnInit {
  @ViewChild(InfoDisplayDirective) infoTemplate: InfoDisplayDirective;

  steps: BehaviorSubject<Observable<any>> = new BehaviorSubject(null);
  data: any; //some interface
  basic: boolean = true;

  constructor(private observe: IngestionExternalHttpService, private componentFactoryResolver: ComponentFactoryResolver){

  }
  
  subscription(){
    this.observe.data.subscribe((data)=>{
        this.displayItems(data);
    })
  }
  
  displayItems(data){
    let newComponent;
    if(_.isArray(data)){
      newComponent = this.componentFactoryResolver.resolveComponentFactory(/**list component template */);
    }else{
      newComponent = this.componentFactoryResolver.resolveComponentFactory(BasicTextObjectDisplay)
    }

    let viewReference = this.infoTemplate.viewContainerRef;
    viewReference.clear();

    let component = viewReference.createComponent(newComponent);
  }


  ngOnInit() {
    this.subscription();

  }
  
}
