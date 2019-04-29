import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { isArray } from 'lodash';
import { InfoDisplayInterface } from './display-templates/pubchem/data-display.interface'
import { BasicTextObjectDisplay } from './display-templates/pubchem/text-object.component';
import { DescriptionListDisplay } from './display-templates/pubchem/description-list.component';
import { CrapomeListDisplay } from './display-templates/crapome/crapome-list.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CrapomeExpProtein} from './display-templates/crapome/sub-components/crapome-exp-prot.component';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';


@Component({
  selector: 'app-app-info-display',
  templateUrl: './app-info-display.component.html',
  styleUrls: ['./app-info-display.component.scss']
})
export class AppInfoDisplayComponent implements OnInit {
  @ViewChild("infoDisplay", {read: ViewContainerRef}) infoTemplate: ViewContainerRef;
  check: boolean = false;
  params: Params;
  

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private route: ActivatedRoute,
    private cache: CacheRouteReuseStrategy
  ){}

  displayItems(data){
    let newComponent;
    let viewReference: ViewContainerRef = this.infoTemplate;
    
    if(viewReference){
      viewReference.clear();
      if(isArray(data)){
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
        this.router.navigate([{outlets:{'side-panel': 'open'}}])
        if(data.provider === 'pubchem'){
          newComponent = this.componentFactoryResolver.resolveComponentFactory(BasicTextObjectDisplay);
        }else if(data.provider === 'crapome'){
          newComponent = this.componentFactoryResolver.resolveComponentFactory(CrapomeExpProtein);
        }
        let component = viewReference.createComponent(newComponent);
        (<InfoDisplayInterface>component.instance).data = data
      }
    }
  }
    
  ngOnInit() {
    
    if(!this.cache.checkHistory()){
      alert("No active queries");
      this.router.navigateByUrl('/query');
    };

    this.route.params.subscribe(params => {
      if(this.params !== params){
        this.params = params;
        this.ngOnInit()
      }
    });
    
    this.cache
        .cacheExists()
        .subscribe((check)=>{
          if(check){
            this.check = check;
            const data = this.cache.retrieve();
            setTimeout(()=>{
              if(!data || data.length < 1){
                alert('Bad query');
                this.router.navigateByUrl('/query');
              }
              this.displayItems(data);
            }, 100)
          }
        })
  }
}
