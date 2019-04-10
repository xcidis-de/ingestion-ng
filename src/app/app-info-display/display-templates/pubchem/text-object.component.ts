import { Component, Input, OnInit } from '@angular/core';


@Component({
  template: `
    <div>
        <p *ngFor="let item of data">{{item}}</p>
    </div>
  `
})
export class BasicTextObjectDisplay implements OnInit{
  @Input() data: any;

  ngOnInit(){
    this.data = Object.values(this.data.metadata);
  }
}