import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';


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
  filters: string[] = [];
  ids: string = '';
  names: string = '';
  adv: boolean = false;
  classifications: string[] = ['Protein', 'Gene', 'Chemistry'];
  databases: string[] = ['PubChem', 'ZINC', 'UniProt', 'CrapOME', 'NCBI', 'COSMIC', 'PantherDB'];
  selected_databases: Object = {};
  selected_classes: Object = {};
  usePseudonym: boolean = true;
  recursive: boolean = false;
  exact: boolean = true;

  constructor(private http: IngestionExternalHttpService) {
  }

  showAdv(){
    this.adv = this.adv === true ? false : true;
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

  formEmitter(){
    const ids: string[] = this.ids.replace(/;|,|\s/g, ';').split(';');
    const names: string[] = this.names.replace(/;|,/g, ';').split(';');
    const submit = {
      names,
      ids,
      headers: {
        //temp
        classname: Object.keys(this.selected_classes)[0], //temp
        usePseudonym: this.usePseudonym,
        recursive: this.recursive,
        exact: this.exact
      },
      providers: Object.keys(this.selected_databases)
    }
    this.http.configure(submit)

  }
}
