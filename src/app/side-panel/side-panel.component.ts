import { Component, OnInit, HostListener } from '@angular/core';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('400ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({transform: 'translateX(-10%)'}))
      ])
    ])
  ],
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent{
  hovered: boolean = true;
  constructor(private router: Router) { }

  onEvent(event){
    if(event.type === 'mouseenter'){
      this.hovered = true;
    }else if(event.type === 'mouseleave'){
      this.hovered = false;
      this.router.navigate([{outlets:{'side-panel':'closed'}}])
    }
  }

  save(){

  }

  saveWith(){

  }
}
