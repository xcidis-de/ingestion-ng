import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrapomeUploadComponent } from './crapome-upload.component';

describe('CrapomeUploadComponent', () => {
  let component: CrapomeUploadComponent;
  let fixture: ComponentFixture<CrapomeUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrapomeUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrapomeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
