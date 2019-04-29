import { Component, OnInit } from '@angular/core';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';
import { Router } from '@angular/router';
import { SidePanelComponent } from '../side-panel.component';

@Component({
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('400ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({transform: 'translateX(-40%)'}))
      ])
    ])
  ],
  selector: 'app-side-panel-tab',
  templateUrl: './side-panel-tab.component.html',
  styleUrls: ['./side-panel-tab.component.scss']
})
export class SidePanelTabComponent extends SidePanelComponent {

  constructor(router: Router) { 
    super(router)
  }

  ngOnInit() {
  }

}
