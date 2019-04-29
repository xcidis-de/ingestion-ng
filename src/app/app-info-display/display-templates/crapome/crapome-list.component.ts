import { Component, Input, OnInit } from '@angular/core';
import { CrapomeMainComponent } from 'src/app/crapome-main/crapome-main.component';
import { IngestionExternalHttpService } from 'src/services/api-service/external.http.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { CrapomeDataInjectionService } from './injection-services/crapome-injection.service';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';

@Component({
    template: `
    <div class="window">
      <div class="crapome-list" *ngIf="(!params.proteins.length && !params.exps.length); else crossRefBlock">
        <hr>
        <p>
          <span id='title'>Input: </span>
          {{data.metadata.input}}
          <span id='title'>Gene: </span>
          {{data.external_id}}
          <span *ngIf="params.species; else selectBox">
            <span id='title'>Species:</span>
            {{params.species}}
          </span>
          <ng-template #selectBox>
            <span>
              Species: 
              <select [(ngModel)]="selectedSpec">
                <option *ngFor="let item of species" value={{item}} (click)="setSelect(item)"> 
                  {{item}} 
                </option>
              </select>
            </span>
          </ng-template>
          <span (click)="checkSpecies()" id="link">
            details
          </span>
        </p>
        <hr>
    </div>
      <ng-template #crossRefBlock>
        <div *ngIf="!params.exps.length; else expBlock">
          <exp-list-comp  [list_item]=data></exp-list-comp>
        </div>
        <ng-template #expBlock>
          <div *ngIf="!params.proteins.length; else finalCompare">
            <protein-list-comp [proteins]="data"></protein-list-comp>
          </div>
          <ng-template #finalCompare>
            <final-compare [data]="data"></final-compare>
          </ng-template>
        </ng-template>
      </ng-template>
    </div>
    `,
    styleUrls: ['./crapome-list.component.scss']
})
export class CrapomeListDisplay implements OnInit {
    @Input() data: any;
    mapped: {[x:string]:string} = CrapomeMainComponent.mapped;
    species: string[] = Object.keys(this.mapped);
    selectedSpec: string;
    params;
    saved;

    constructor(
      private http: IngestionExternalHttpService,
      ){
      }
      
    ngOnInit(){
      this.params = _.get(this.data.headers, 'crapome_params');
      this.saved = _.get(this.params, 'species');

    }
    setSelect(choice: string){
      this.selectedSpec = choice;
    }

    checkSpecies(){
        if(!this.selectedSpec && !this.saved){
          alert('Must choose species');
        }else{
          const request = {
            ids: [],
            names: [this.data.external_id],
            headers: {
              crapome_params:{
                species: this.saved || this.mapped[this.selectedSpec],
                proteins: [this.data.external_id]
              }
            },
            providers: ['crapome']
          }
          this.http.configure(request, {route: '/ingestion/external'});
        }
    }
}