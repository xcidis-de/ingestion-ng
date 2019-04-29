import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelTabComponent } from './side-panel-tab.component';

describe('SidePanelTabComponent', () => {
  let component: SidePanelTabComponent;
  let fixture: ComponentFixture<SidePanelTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
