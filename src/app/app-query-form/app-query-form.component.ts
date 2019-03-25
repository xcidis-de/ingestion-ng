import { Component, OnInit, inject, ɵConsole } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';
import { Observable } from 'rxjs';

interface Name extends Element {
  name: string
}
type HTMLElementEvent<T extends Name> = Event & {
  target: T
}
@Component({
  selector: 'app-query-form',
  templateUrl: './app-query-form.component.html',
  styleUrls: ['./app-query-form.component.scss']
})

export class AppQueryFormComponent implements OnInit {
  private http: IngestionExternalHttpService;
  filters: string[] = [];
  ids: string = '';
  names: string = '';
  classifications: string[] = ['Protein', 'Gene', 'Chemistry'];
  databases: string[] = ['PubChem', 'ZINC', 'UniProt', 'CrapOME', 'NCBI', 'COSMIC', 'PantherDB'];
  selected_databases: Object = {

  }
  selected_classes: Object = {

  }
  constructor(http: IngestionExternalHttpService) {
    this.http = http;
   }

  ngOnInit() {  
  }


  buttonSelect(event: HTMLElementEvent<Name>, value: string){
    const target = event.target
    if(target.name === "classes"){
      if(this.selected_classes[value]){
        delete this.selected_classes[value]
      }else{
        this.selected_classes[value] = value;
      }
    }else{
      if(this.selected_databases[value]){
        delete this.selected_databases[value];
      }else{
        this.selected_databases[value] = value;
      }
    }

  }

  formSubmit(){
    const ids: string[] = this.ids.replace(' ', '').split(';');
    const names: string[] = this.names.replace(' ', '').split('; ');
    const observeReq: Observable<any> = this.http.configure(ids, names, Object.keys(this.selected_classes), Object.keys(this.selected_databases));
    observeReq.subscribe({
      next: item => console.log(item),
      error: err => console.error(err),
      complete: ()=> console.log('done')
    })
  }
}
