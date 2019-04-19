import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import * as config from './config';
import { IngestionPostInterface, InternalPostInterface } from './service.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { isEqual } from 'lodash';
import { RouteHistoryService } from '../routeCache/route-history.service';
import { CacheRouteReuseStrategy } from '../routeCache/cache-router.service';

@Injectable()
export class IngestionExternalHttpService {
    filter: string = '/dbfilters';
    host: string = config.url.host || 'http://localhost:3000';
    requested: boolean = false;
    active: false;
    query: IngestionPostInterface

    constructor(
        private http: HttpClient,
        private history: RouteHistoryService,
        private cache: CacheRouteReuseStrategy,
        private router: Router,
        private route: ActivatedRoute
    ){

    }

    get(id, provider, route){
        let host = this.host;
        let endpoint = `/${provider}/${id}`;
        this.router.navigateByUrl(`information${endpoint}`);
        return this.http.get(host + route + endpoint);
    }

    post(json: IngestionPostInterface | InternalPostInterface, {route}){
        const hash = this.queryHash();
        this.router.navigateByUrl(`information/${hash}`)
        return this.http.post(this.host + route, json);
    }

    pager(headers, provider){
        this.http.post(this.host + '/ingestion/external/page', {headers, provider})
            .pipe(first())
            .subscribe((data)=>{
                //hash potentially overlapping in routing
                this.cache.store(
                    {query:{
                        params:{
                            ids:[],
                            names:[]
                        },
                        options:{
                            headers, 
                            providers:[provider]
                        }
                    }, data})
            })
    }

    configure({ids, names, headers, providers}, {route}){
        const options = this.optionConfig();
        this.requested = true;
        const params = this.basicValidation(ids, names);
        
        if(this.checkLast(params, {headers, providers})){
            this.query = {params, options:{headers, providers}};
            const query = this.query;
            if(params.names.length === 0 
                && providers.length === 1 
                && !!headers.recursive === false
                && !!headers.usePseudym === false
                && params.ids.length === 1){
                    this.get(ids[0], providers[0], route)
                    .pipe(first(), catchError(this.handler))
                    .subscribe((data)=>{
                        this.cache.store({query, data})
                    });
                }else{
                    this.post({params, options:{headers, providers}}, {route})
                    .pipe(first(), catchError(this.handler))
                    .subscribe((data)=>{
                        this.cache.store({query, data})
                    })
                }
            } else {
                //load from cache
                console.log('else');
            }
        }
            
    basicValidation(ids, names){
        const obj = {
            ids: ids.filter(item=>{ if(item){return item}}),
            names: names.filter(item=>{ if(item){return item}})
        }
        return obj;
    }

    handler(err: HttpErrorResponse){
        console.error(
            `Server returned with code ${err.status}, message: ${err.error}`
        );

        return throwError(
            'An error occured, try again later.'
        )
    }

    checkLast(params, options){
        if(isEqual(this.query, {params, options})){
            return false;
        }else{
            this.query = {params, options};
            this.history.add(this.query)
            return true;
        }
    }

    queryHash(){
        const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let array = new Uint8Array(30);
        window.crypto.getRandomValues(array);
        array = array.map(x => validChars.charCodeAt(x % validChars.length));
        const randomState = String.fromCharCode.apply(null, array);
        return randomState
    }

    optionConfig(){

    }
}