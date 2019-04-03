import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';
import { Router } from '@angular/router';


@Component({
  template: `
  <div class="window">
  <div *ngFor="let item of data" class="items"  (click)="this.get(item.external_id, item.provider)">
  <hr>
  <a>
  <h4>{{item.metadata.IUPACName}}</h4>
  </a>
  <p *ngIf="item.metadata.MolecularFormula"><span style="font-weight: bold;">Molecular Formula: </span>{{item.metadata.MolecularFormula}}</p>
  <p *ngIf="item.metadata.MolecularWeight"><span style="font-weight: bold;">Molecular Weight: </span>{{item.metadata.MolecularWeight}}</p>
  <p *ngIf="item.metadata.InChIKey"><span style="font-weight: bold;">InChIKey: </span>{{item.metadata.InChIKey}}</p>
  <hr>
  </div>
    <ul style="list-style-type:none; display: table; margin:0 auto;">
      <li style="display:inline; font-size:2em; margin: 10px; cursor:pointer;" *ngFor="let number of available_pages" (click)="page(number)">{{number}}</li>
    </ul>
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
      private router: Router
      ){

  }
  ngOnInit(){
    this.headers = this.data[0].headers;
    console.log(this.headers);
    let page_numbers: number = this.data[0].headers.page_size / 50;
    if(this.data[0].headers.page_size % 50 !== 0){
      page_numbers++
    }
    const pages: Array<number | string> = [];
    for(let i = 1; i <= page_numbers; i++){
      pages.push(i);
    }

    
    const current = this.data[0].headers.paging_index || 0;
    this.total_pages = pages;

    if(current < 3){
      this.available_pages = pages.slice(0, current+3);
    }else{
      this.available_pages = pages.slice(current-3, current+5)
    }

    if(current < pages.length - 3){
      this.available_pages.push('...');
    }

  }
  
  page(number:number){
    const headers = this.data[0].headers;
    headers.paging_index = number - 1;
    this.http.pager(this.data[0].headers, this.data[0].provider);
  }

  get(id, provider){
      this.router.navigated
      this.router.navigateByUrl(`/information/${provider}/${id}`);
      this.http.get(id, provider)
  }
}