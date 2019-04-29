import { Component, Input } from '@angular/core';
import { CrapomeDataInjectionService } from '../injection-services/crapome-injection.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { IngestionExternalHttpService } from 'src/services/api-service/external.http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';

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
                    <button (click)="showExperiment()">
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
export class CrapomeExpComponent {
    @Input() list_item: any;
    info: boolean = false;

    constructor(
        private cache: CacheRouteReuseStrategy,
        private http: IngestionExternalHttpService,
        private router: Router,
    ){
       
    }

    getSrc(){
        let experiment = this.list_item.metadata.expt;
        const url = `http://cors.io/?http://crapome.org/?q=viewexperiment/${experiment.slice(2)}&width=500&height=500&iframe=true`
        return url;
    }

    displayIframe(){
        this.info = true;
    }

    showExperiment(){
        const data = JSON.parse(JSON.stringify(this.list_item))
        const path = `/information/crapome/${data.metadata.expt}/${data.external_id}`
        data.headers.crapome_params.exps = [data.metadata.expt];

        const copy = JSON.parse(JSON.stringify(this.http.query))
        this.http.query = copy
        this.cache.store({query: copy, data}, path);
        this.router.navigateByUrl(path)
    }

}