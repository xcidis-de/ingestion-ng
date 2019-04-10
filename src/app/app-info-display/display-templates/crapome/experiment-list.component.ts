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
                    RefSeqID: {{list_item.metadata.refSeqID}}
                </span>
                <span>
                    Gene: {{list_item.metadata.geneSymbols}}
                </span>
                <span>
                    Expt.: {{list_item.metadata.expt}}
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
    selector: 'exp-list-comp'
})
export class CrapomeExpComponent implements OnInit{
    @Input() list_item: any;
    info: boolean = false;

    constructor(
        private http: IngestionExternalHttpService,
        private injector: CrapomeDataInjectionService
    ){
    }

    ngOnInit(){
    }

    getSrc(){
        let experiment = this.list_item.metadata.expt;
        const url = `http://cors.io/?http://crapome.org/?q=viewexperiment/${experiment.slice(2)}&width=500&height=500&iframe=true`
        return url;
    }

    displayIframe(){
        //updates template
        this.info = true;
    }

    doExperiment(){
        //pass whole dataset to injector
        //this.injector.setExperiment()
        const exp = this.list_item.metadata.expt
        const final = {
            ids: [],
            names: [this.list_item.external_id],
            headers: {
                crapome_params: Object.assign(
                this.list_item.headers.crapome_params, 
                {exps: [exp]}),
            },
            providers: ['crapome']
        }
        this.injector.set('refseq', this.list_item.metadata.refSeqID)
        this.http.configure(final)
    }

}