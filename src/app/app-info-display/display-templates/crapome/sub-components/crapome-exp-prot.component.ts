import { Component, Input, OnInit } from "@angular/core";
import { CrapomeDataInjectionService } from '../injection-services/crapome-injection.service';
import { map } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';

@Component({
    template:`
    <div>
        <ul>
            <li>Gene Symbol: {{data.external_id}}</li>
            <li>RefSeq|GI: {{data.refseq}}</li>
            <li>Exp: {{data.headers.crapome_params.exps[0]}}</li>
        </ul>
        <table>
        <thead>
            <tr>
            <th>Sequence</th>
            <th>Charge</th>
            <th>Peptide Probability</th>
            <th>Number Spectra</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let data of table;">
            <td>{{data.peptide}}</td>
            <td>{{data.charge}}</td>
            <td>{{data.init_prob}}</td>
            <td>{{data.psm}}</td>
            </tr>
        </tbody>
        </table>
    </div>`,
    styleUrls: ['./crapome-exp-prot.component.scss'],
    selector: 'final-compare'
})
export class CrapomeExpProtein implements OnInit{
    @Input() data: any;
    table: {
        charge: string, 
        initial_probability: string, 
        PSM: string
        peptide: string
    }[];

    constructor(
       private injector: CrapomeDataInjectionService){

    }
    ngOnInit(){
        this.data.refseq = this.injector.get('peptides').metadata.RefSeq;
        this.table = map(this.data.metadata, (el, peptide)=>{
            return {
                peptide,
                charge: el.charge,
                psm: el.PSM,
                init_prob: el.initial_probability
            }
        });
        
    }
}

//build some sort of chart here to house data