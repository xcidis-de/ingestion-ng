import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQueryFormComponent } from './app-query-form.component';

describe('AppQueryFormComponent', () => {
  let component: AppQueryFormComponent;
  let fixture: ComponentFixture<AppQueryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppQueryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppQueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
