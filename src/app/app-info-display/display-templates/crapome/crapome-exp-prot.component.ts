import { Component, Input, OnInit } from "@angular/core";

@Component({
    template:`<div>{{data | json}}</div>`,
    styleUrls: []
})
export class CrapomeExpProtein implements OnInit{
    @Input() data: any;

    ngOnInit(){
        console.log(this.data);
    }
}

//build some sort of chart here to house data