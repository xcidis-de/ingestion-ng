import { Component, OnInit } from '@angular/core';
import { IngestionExternalHttpService } from 'src/services/api-service/ingestion.http.service';
import { AppInfoDisplayComponent } from '../app-info-display/app-info-display.component';
import { Router } from '@angular/router';
import { query_form_controls as formText } from '../../environments/environment';

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
  classifications: string[] = formText.classifications;
  databases: string[] = formText.databases;
  selected_databases: Object = {};
  selected_classes: Object = {};
  usePseudonym: boolean = false;
  recursive: boolean = false;
  exact: boolean = false;
  adv: boolean = false;
  names: string = '';
  ids: string = '';

  constructor(private http: IngestionExternalHttpService, private router: Router) {
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
        this.selected_databases[value] = value.toLowerCase();
      }
    }

  }

  formEmitter(){
    
    const ids: string[] = this.ids.replace(/,|\s/g, ';').split(';');
    const names: string[] = this.names.split(';');
    const submit = {
      names,
      ids,
      headers: {
        classname: Object.keys(this.selected_classes)[0], //temp
        usePseudonym: this.usePseudonym,
        recursive: this.recursive,
        exact: this.exact
      },
      providers: Object.keys(this.selected_databases).map(el => el.toLowerCase())
    }
    this.http.configure(submit, {route: '/ingestion/external'})
    
  }
}
