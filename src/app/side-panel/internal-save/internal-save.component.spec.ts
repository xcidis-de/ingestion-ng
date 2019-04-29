import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalSaveComponent } from './internal-save.component';

describe('InternalSaveComponent', () => {
  let component: InternalSaveComponent;
  let fixture: ComponentFixture<InternalSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
