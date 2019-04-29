import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
    <div>
        <p *ngFor="let item of data">{{item}}</p>
    </div>
  `
})
export class BasicTextObjectDisplay implements OnInit {
  @Input() data: any;

  constructor(){
  }

  ngOnInit(){
    this.data = Object.values(this.data.metadata);
  }

}