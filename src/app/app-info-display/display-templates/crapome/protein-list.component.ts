import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `
        <div>{{list_item | json}}</div>
    `,
    styleUrls: [],
    selector: 'protein-list-comp'
})
export class CrapomeProteinList implements OnInit {
    @Input() list_item: any;

    ngOnInit(){
    }
}