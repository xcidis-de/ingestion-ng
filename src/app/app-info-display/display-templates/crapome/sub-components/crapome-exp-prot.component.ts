import { Component, Input, OnInit } from "@angular/core";
import { map } from 'lodash';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';

@Component({
    template:`
    <div>
        <ul>
            <li>Gene Symbol: {{gene}}</li>
            <li>RefSeq|GI: {{refseq}}</li>
            <li>Exp: {{exp}}</li>
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
    date: string;
    gene: string;
    refseq: string;
    exp: string;

    table: {
        charge: string, 
        initial_probability: string, 
        PSM: string
        peptide: string
    }[];

    constructor(
        private cache: CacheRouteReuseStrategy,
       ){

    }
    ngOnInit(){
        if(!this.data){
            this.data = this.cache.retrieve();
        }
        this.date = this.data.metadata["Modify Date"];
        this.refseq = this.data.metadata["refSeqID"];
        this.gene = this.data.metadata.geneSymbols;
        this.exp = this.data.metadata.expt;

        delete this.data.metadata["Modify Date"];
        delete this.data.metadata["refSeqID"];
        delete this.data.metadata.geneSymbols;
        delete this.data.metadata.expt;

        setTimeout(()=>{
            this.table = map(this.data.metadata, (el, peptide)=>{
                return {
                    peptide,
                    charge: el.charge,
                    psm: el.PSM,
                    init_prob: el.initial_probability
                }
            });
        }, 1);
        
    }
}

//build some sort of chart here to house data