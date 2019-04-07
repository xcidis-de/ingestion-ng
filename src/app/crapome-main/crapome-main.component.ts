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
  private species: string = 'human';
  static readonly mapped = {
    'Human': 'human',
    'E. coli': 'ecoli',
    'S. cerevisiae': 'yeast'
  }
  private listed: string[];

  constructor(
    private http: IngestionExternalHttpService,
    private router: Router
    ) {
      this.listed = Object.keys(CrapomeMainComponent.mapped);
  }

  setOption(value){
    this.species = CrapomeMainComponent.mapped[value]
  }

  openExplorer(){

  }

  readForm(){
    const delimiter = ';'
    const data: string[] = this.file.replace(' ', '').split(delimiter);
    data.pop();

    const formatted = {
      ids: [],
      names: data,
      headers: {
        crapome_params:{
          species: this.species
        }
      },
      providers: ['crapome']
    }
    this.http.configure(formatted);
    this.router.navigateByUrl(`/information`)
  }

}
