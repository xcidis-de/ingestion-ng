import { Component } from '@angular/core';
import { IngestionExternalHttpService } from 'src/services/api-service/ingestion.http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crapome-main',
  templateUrl: './crapome-main.component.html',
  styleUrls: ['./crapome-main.component.scss']
})
export class CrapomeMainComponent {
  private file: string;
  private spec: string = 'human';
  private type: string = 'experiment';
  static readonly mapped = {
    'Human': 'human',
    'E. coli': 'ecoli',
    'S. cerevisiae': 'yeast'
  }
  private mapped = CrapomeMainComponent.mapped;
  private listed: string[];
  private input_type: string[] = ['experiment', 'gene'];

  constructor(
    private http: IngestionExternalHttpService,
    private router: Router
    ) {
      this.listed = Object.keys(CrapomeMainComponent.mapped);
  }

  openExplorer(){

  }


  readForm(){
    const delimiter = ';'
    const data: string[] = this.file.replace(' ', '').split(delimiter);
    data.pop();
    
    let formatted
    if(this.type === 'experiment'){
      formatted = {
        ids: [],
        names: [data],
        headers: {
          crapome_params:{
            exps: data,
            species: this.spec
          }
        },
        providers: ['crapome']
      }
    }else{
      formatted = {
        ids: [],
        names: data[0],
        headers: {
          crapome_params:{
            species: this.spec,
            proteins: data
          }
        },
        providers: ['crapome']
      }
    } 
    this.http.configure(formatted);
    this.router.navigateByUrl(`/information`)
  }

}
