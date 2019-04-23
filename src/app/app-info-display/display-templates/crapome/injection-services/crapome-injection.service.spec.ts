import { TestBed } from '@angular/core/testing';

import { CrapomeDataInjectionService as CrapomeService} from './crapome-injection.service'

describe('CrapomeDataInjectionService', () => {
  let service: CrapomeService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(CrapomeService);
    expect(service).toBeTruthy();
  });

  it('should have these methods',()=>{
    service = TestBed.get(CrapomeService);
    expect(service.get).toBeTruthy();
    expect(service.set).toBeTruthy();
    expect(service.download).toBeTruthy();
    expect(service.viewTable).toBeTruthy();
    expect(service.insertTable).toBeTruthy();
  });

  it('should get items that were set', ()=>{
      service = TestBed.get(CrapomeService)
      service.set('setting something', 'with getting something');
      const got = service.get('setting something');

      expect(got).toBe('with getting something');
  });

  it('should create viewable table of inserted information', ()=>{
      const test_object = {a:{a:'a', b:'b'}, b:{a:'a',b:'b'}}
      service = TestBed.get(CrapomeService);
      service.insertTable(test_object)
      const visible = service.viewTable(0);

      expect(visible).toEqual([test_object])
  })
});
