import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { IngestionExternalHttpService } from '../../../../services/api-service/external.http.service';
import { Router, ActivatedRoute } from '@angular/router';
import {SpinnerComponent } from '../../../spinner/spinner.component';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';

@Component({
  template: `
  <div class="window">
  <div (click)="this.get(this.data.external_id, this.data.provider)" *ngIf="data; else spinner">
  <hr>
  <a>
  <h4>{{this.data.metadata.IUPACName}}</h4>
  </a>
  <p *ngIf="this.data.metadata.MolecularFormula"><span style="font-weight: bold;">Molecular Formula: </span>{{this.data.metadata.MolecularFormula}}</p>
  <p *ngIf="this.data.metadata.MolecularWeight"><span style="font-weight: bold;">Molecular Weight: </span>{{this.data.metadata.MolecularWeight}}</p>
  <p *ngIf="this.data.metadata.InChIKey"><span style="font-weight: bold;">InChIKey: </span>{{this.data.metadata.InChIKey}}</p>
  <hr>
  </div>
    <ng-template #spinner>
      <app-spinner></app-spinner>
    </ng-template>
  </div>
  `
})
export class DescriptionListDisplay implements OnInit {
  @Input() data: any;
  headers;
  available_pages: Array<number | string> = [];
  total_pages: Array<string | number> = [];
  page_index: number = 0;

  constructor(
      private http: IngestionExternalHttpService,
  ){

  }
  ngOnInit(){
    this.headers = this.data.headers;
  }

  get(id, provider){
    this.http.configure({ids:[id], names:[], providers: [provider], headers:{}}, {route:'/ingestion/external'})
  }
}