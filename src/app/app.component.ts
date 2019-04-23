import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService } from 'src/services/logged-in/user.service';
import { CacheRouteReuseStrategy } from 'src/services/routeCache/cache-router.service';
import { IngestionPostInterface } from '../services/api-service/service.interface'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Polus Datastore';

  constructor(
    private user: UserAuthService,
    private cache: CacheRouteReuseStrategy,
  ){}
  
  ngOnDestroy(){
    //cache here
    const path = this.cache.getPath();
    const data = this.cache.retrieve();
    const hash_me = new Map<HashAlgorithmIdentifier, {query: IngestionPostInterface, data: any}>([path, data]);
  }

  ngOnInit(){
    //if cache read cache otherwise redirect
  }
}
