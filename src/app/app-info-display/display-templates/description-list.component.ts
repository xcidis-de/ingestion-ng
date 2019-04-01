import { Component, Input } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';
import { Router } from '@angular/router';


@Component({
  template: `
  <div class="window">
  <div *ngIf="pageable"><p (click)="page(false)"><</p><p (click)="page(true)">></p></div>
  <div *ngFor="let item of data" class="items"  (click)="this.get(item.external_id, item.provider)">
  <hr>
  <a>
  <h4>{{item.metadata.title}}</h4>
  </a>
  <p *ngIf="item.metadata.description">{{item.metadata.description}}</p>
  <hr>
  </div>
  </div>
  `
})
export class DescriptionListDisplay {
  @Input() data: any;
  @Input() pageable: boolean;
  
  page_index: number = 0;

  constructor(
      private http: IngestionExternalHttpService,
      private router: Router
      ){

  }

  page(direction: boolean){
    if(direction){
      this.page_index += 50
    }else if(this.page_index > 0){
      this.page_index -= 50
    }

    this.refreshData();
  }

  refreshData(){
    this.http.pager(this.page_index, this.data[0].headers.paging_tokens, this.data[0].provider);
  }

  get(id, provider){
      this.router.navigated
      this.router.navigateByUrl(`/information/${provider}/${id}`);
      this.http.get(id, provider)
  }
}