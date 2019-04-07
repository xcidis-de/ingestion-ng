import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrapomeMainComponent } from './crapome-main.component';

describe('CrapomeMainComponent', () => {
  let component: CrapomeMainComponent;
  let fixture: ComponentFixture<CrapomeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrapomeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrapomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
