import { Component, Input } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';
import { Router } from '@angular/router';
import { BasicTextObjectDisplay } from './text-object.component';
import { AppInfoDisplayComponent } from '../app-info-display.component';


@Component({
  template: `
    
    <div *ngFor="let item of data" class="items"  (click)="this.get(item.external_id, item.provider)">
      <hr>
        <a>
            <h4>{{item.metadata.title}}</h4>
        </a>
        <p *ngIf="item.metadata.description">{{item.metadata.description}}</p>
      <hr>
    </div>
  `
})
export class DescriptionListDisplay {
  @Input() data: any;

  constructor(
      private http: IngestionExternalHttpService,
      private router: Router
      ){
  }

  get(id, provider){
      this.router.navigated
      this.router.navigateByUrl(`/information/${provider}/${id}`);
      this.http.get(id, provider)
  }
}