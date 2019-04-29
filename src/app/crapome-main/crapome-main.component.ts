import { Component, OnInit } from '@angular/core';
import { IngestionExternalHttpService } from 'src/services/api-service/external.http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CrapomeDataInjectionService } from '../app-info-display/display-templates/crapome/injection-services/crapome-injection.service';

@Component({
  selector: 'app-crapome-main',
  templateUrl: './crapome-main.component.html',
  styleUrls: ['./crapome-main.component.scss']
})
export class CrapomeMainComponent implements OnInit{
  private file: string;
  private spec: string = 'human';
  private type: string = 'experiment';
  static readonly mapped = {
    'Human': 'human',
    'E. coli': 'ecoli',
    'S. cerevisiae': 'yeast'
  }
  private mapped = CrapomeMainComponent.mapped;
  private listed: string[] = Object.keys(this.mapped);
  private input_type: string[] = ['experiment', 'gene'];
  private upload: boolean = false;

  constructor(
    private http: IngestionExternalHttpService,
    private router: Router,
    private injector: CrapomeDataInjectionService
    ) {
      
  }

  ngOnInit(){
    this.router.navigate([{outlets: {'side-panel': null}}])
  }

  uploadForm(){
    this.upload = true;
  }

  organizeInput(data: string[]): string[]{
    const num_reg = /^\d+/g;
    const cc_added = data.map((el)=>{
      if(num_reg.test(el)){
        return 'CC' + el;
      }else{
        return el.toUpperCase();
      }
    })    
    return cc_added;
  }
  
  readForm(){
    const input_one = ';'
    const delimiters = new RegExp(`${input_one}`)
    const data: string[] = this.file.replace(' ', '').split(delimiters);
    data.pop();
    
    let formatted;
    if(this.type === 'experiment'){
      const exps = <Array<string>>this.organizeInput(<Array<string>>data)
      this.injector.set('exps', exps);
      formatted = {
        ids: [],
        names: data,
        headers: {
          crapome_params:{
            exps,
            species: this.spec
          }
        },
        providers: ['crapome']
      }
    }else{
      formatted = {
        ids: [],
        names: data,
        headers: {
          crapome_params:{
            species: this.spec,
            proteins: data
          }
        },
        providers: ['crapome']
      }
    } 
    this.http.configure(formatted, {route: '/ingestion/external'});
  }

}
