import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { CrapomeDataInjectionService } from '../injection-services/crapome-injection.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { IngestionExternalHttpService } from 'src/services/api-service/ingestion.http.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
    template: `
        <div class='exp-border'>
            <p>
                <span>
                    RefSeqID: {{listed.metadata.refSeqID}}
                </span>
                <span>
                    Gene: {{listed.metadata.geneSymbols}}
                </span>
                <span>
                    Expt.: {{listed.metadata.expt}}
                </span>
                <span>
                    <button (click)="doExperiment()">
                        peptides
                    </button>
                </span>
                <span>
                    <button (click)="displayIframe()">
                        details
                    </button>
                </span>
                </p>
            <div *ngIf="info">
                <iframe [src]="getSrc() | safe"></iframe>
            </div>
        </div>
    `,
    styleUrls: ['./experiment-list.component.scss'],
    selector: '<exp-list-comp>'
})
export class CrapomeExpComponent implements OnInit{
    @Input() listed: any;
    info: boolean = false;

    constructor(
        private http: IngestionExternalHttpService
    ){
        if(!this.listed){
            //get list from service
            //this.injector.getlistitem()
        }
    }

    ngOnInit(){
    }

    getSrc(){
        const experiment = this.listed.metadata.expt;
        const expNum = experiment.slice(2);
        const url = `http://cors.io/?http://crapome.org/?q=viewexperiment/${expNum}&width=500&height="80%"&iframe=true`
        return url;
    }

    displayIframe(){
        //updates template
        this.info = true;
    }

    doExperiment(){
        //pass whole dataset to injector
        //this.injector.setExperiment()
        const exp = this.listed.metadata.expt
        const final = {
            ids: [],
            names: [this.listed.external_id],
            headers: {
                crapome_params: Object.assign(
                this.listed.headers.crapome_params, 
                {exps: [exp]}),
            },
            providers: ['crapome']
        }
        this.http.configure(final)
    }

}