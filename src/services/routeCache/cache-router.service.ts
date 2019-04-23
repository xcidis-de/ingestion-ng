import { ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle, Router } from '@angular/router';
import { IngestionPostInterface } from '../api-service/service.interface';
import { RouteHistoryService } from './route-history.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CacheRouteReuseStrategy {
  storedRouteHandles = new Map<HashAlgorithmIdentifier, {query: IngestionPostInterface, data: any}>();
  behaviorSubject = new Subject()
  allowRetriveCache = {};

  constructor(
    private history: RouteHistoryService,
    private router: Router,
  ){}

  retrieve(): any | null {
    const path = this.getPath();
    const {data} = this.storedRouteHandles.get(path);
    return data;
  }

  cacheExists(): Observable<boolean> {
    return Observable.create(observer => {
      const timer = setInterval(()=>{
        if(this.allowRetriveCache.hasOwnProperty(this.getPath())){
          clearInterval(timer);
          observer.next(true);
          observer.complete();
        }else{
          observer.next(false);
        }
      }, 200)
    })
  }

  store(detachedTree: {query: IngestionPostInterface, data: any}, path?: string): void {
    if(!path){
      path = this.getPath();
    }
    this.storedRouteHandles.set(path, detachedTree);
    this.allowRetriveCache[path] = true;
  }

  getPath(): string {
    return this.router.routerState.snapshot.url
  }
  

  checkHistory(){
    if(this.history.list.length){
      return true;
    }else{
      return false;
    }
  }

}