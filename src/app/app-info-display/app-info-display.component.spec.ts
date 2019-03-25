import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoDisplayComponent } from './app-info-display.component';

describe('AppInfoDisplayComponent', () => {
  let component: AppInfoDisplayComponent;
  let fixture: ComponentFixture<AppInfoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInfoDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
