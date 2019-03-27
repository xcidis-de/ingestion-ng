import { Component, Input } from '@angular/core';
 

@Component({
  template: `
    <div>
        <p *ngFor="let item of data">{{item}}</p>
    </div>
  `
})
export class BasicTextObjectDisplay {
  @Input() data: any;

}