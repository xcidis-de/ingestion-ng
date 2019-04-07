import { Component } from "@angular/core";
import {CrapomeDataInjectionService} from '../injection-services/crapome-injection.service';

@Component({
    template: `
        <div>ok</div>
    `,
    styleUrls: [],
    selector: 'final-compare'
})

export class CrapomeFinalCompare {
    constructor(
        private injector: CrapomeDataInjectionService
    ){

    }
    //save experiments and associated data here
}