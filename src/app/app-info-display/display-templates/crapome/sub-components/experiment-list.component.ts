import { Component, Input } from '@angular/core';
import { CrapomeDataInjectionService } from '../injection-services/crapome-injection.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { IngestionExternalHttpService } from 'src/services/api-service/ingestion.http.service';
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
        private route: ActivatedRoute,
        private http: IngestionExternalHttpService,
        private router: Router
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
        const data = Object.assign({}, this.list_item);
        data.headers.crapome_params.exps = [data.metadata.expt];
        this.cache.store({query: this.http.query, data});
        this.router.navigateByUrl(`/information/crapome/${data.metadata.expt}/${data.external_id}`)
    }

}