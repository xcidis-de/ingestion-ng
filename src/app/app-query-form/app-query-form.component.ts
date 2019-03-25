import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-form',
  templateUrl: './app-query-form.component.html',
  styleUrls: ['./app-query-form.component.scss']
})
export class AppQueryFormComponent implements OnInit {
  filters: string[] = [];
  ids: string = '';
  names: string = '';
  //can populate from static variable on load. To consolidate sources of truth.
  classifications: string[] = ['Protein', 'Gene', 'Chemistry'];
  databases: string[] = ['PubChem', 'ZINC', 'UniProt', 'CrapOME', 'NCBI', 'COSMIC', 'PantherDB'];

  constructor() { }

  ngOnInit() {  
  }


  buttonSelect(){

  }
}
