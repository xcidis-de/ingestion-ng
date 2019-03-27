import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[info-display]',
})
export class InfoDisplayDirective {
    constructor(public viewContainerRef: ViewContainerRef){
        console.log(this.viewContainerRef)
    }
}
