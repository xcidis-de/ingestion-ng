import { Component, Input, OnInit } from '@angular/core';
import { CrapomeDataInjectionService } from '../injection-services/crapome-injection.service';
import { isNumber, isNaN, get, isObject } from 'lodash';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';

@Component({
    template: `
        <div class="window">
        <table class='table'>
        <thead>
            <tr>
            <th class='ge'>Gene</th>
            <th class='refseq'>REFSEQID</th>
            <th class='set-table-column'>AVE_SC</th>
            <th class='set-table-column'>NUM_EXPT</th>
            <th class='set-table-column' *ngFor="let exp of exps">{{exp}}</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let gene of table; index as i">
            <td class='ge'>{{gene.gene}}</td>
            <td class='refseq'>{{gene.data.refSeqID}}</td>
            <td class='set-table-column'>{{getAvgSc(gene)}}</td>
            <td class='set-table-column'>{{getExpNum(gene)}}</td>
            <td class='set-table-column' *ngFor="let exp of exps">{{getPsm(gene, exp)}}</td>
        </tbody>
        </table>
        <button style="margin-top: 10px;" (click)="download()">Download</button>
        <p style="display: inline;" class="center heavy red">
            <span (click)="page(0)">
                <
            </span>
            <span (click)="page(1)">
                >
            </span>
        </p>
        </div>
    `,
    styleUrls: ['crapome-exp-prot.component.scss'],
    selector: 'protein-list-comp'
})
export class CrapomeProteinList implements OnInit {
    @Input() proteins;
    exps: string[];
    table: any[];
    index: number = 0;
    constructor(
        private crapoService: CrapomeDataInjectionService,
    ){
    }
    ngOnInit(){
        const exps = this.crapoService.get('exps');
        const proteins = this.crapoService.get('proteins');
        this.proteins = proteins
        this.exps = exps.map((el)=>{
            if(!isNaN(parseInt(el)) && isNumber(parseInt(el))){
                return 'CC' + `${el}`;
            }else{
                return el.toUpperCase();
            }
        })
        this.exps = this.exps.sort(this.sortExperiments);
        this.crapoService.insertTable(this.proteins.metadata);
        this.table = this.crapoService.viewTable(0);
    }

    sortExperiments(a,b){
        const c = parseFloat(a);
        const d = parseFloat(b);
        if(isNaN(c) && isNaN(d)){
            return parseFloat(a.slice(2)) - parseFloat(b.slice(2)); 
        }else if(!isNaN(c) && isNaN(d)){
            return c - parseFloat(b.slice(2));
        }else if(isNaN(c) && !isNaN(d)){
            return parseFloat(a.slice(2)) - d;
        }else{
            return c - d;
        }
    }

    download(){
        this.crapoService.download();
    }


    page(direction: number){
        if(direction === 0 && this.index > 0){
            this.index = this.index - 15;
            this.table = this.crapoService.viewTable(this.index);
        }else if(direction === 1 && this.index < this.crapoService.length - 15){
            this.index = this.index + 15;
            this.table = this.crapoService.viewTable(this.index);
        }
    }

    getAvgSc(gene){
        let peptideCount = 0;
        let count = 0;
        for(const exp in gene.data){
            
            if(exp !== 'refSeqID'){
                let psm = this.getPsm(gene, exp);
                if(!psm){
                    continue;
                }
                count++;
                peptideCount += parseInt(psm);
            }
        }
        return (peptideCount / count).toFixed(2);
    }
    
    getExpNum(gene){
        return Object.keys(gene.data).length - 1;
    }

    getPsm(gene, exp){
        const psm = get(gene, `data[${exp}].psm`);
        if(!psm){
            return 0;
        }
        return psm
    }
}