import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import * as config from './config';
import { IngestionPostInterface } from './service.interface';

@Injectable({
    providedIn: 'root'
})
export class IngestionExternalHttpService {
    filter: string = '/dbfilters';
    host: string = config.url.host || 'http://localhost:3000/ingestion/external';
    data: BehaviorSubject<any>;

    constructor(private http: HttpClient){
        this.data = new BehaviorSubject(null);
    }

    get(id, provider){
        let endpoint = this.host;
        endpoint += `/${provider}/${id}`
        this.http.get(endpoint).pipe(
            retry(1),
            catchError(this.handler)
        ).subscribe((data)=>{
            this.data.next(data);
        });
    }

    post(json: IngestionPostInterface, options: Object = {}){
        return this.http.post(this.host, json, options).pipe(
            catchError(this.handler)
        ).subscribe((data)=>{
            this.data.next(data);
        });;
    }

    configure({ids, names, headers, providers}){
        const params = this.basicValidation(ids, names);
        if(params.name.length === 0 && providers.length === 1 && headers.length === 0 && params.id.length === 1){
            this.get(ids[0], providers[0]);
        }else{
            // replace headers with an object to enable search by psuedo bool and filter properties array
            this.post({params, options:{headers, providers}})
        }
    }
    
    basicValidation(ids, names){
        const obj = {
            id: ids.filter(item=>{ if(item){return item}}),
            name: names.filter(item=>{ if(item){return item}})
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
}