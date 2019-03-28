import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { retry, catchError, merge, last } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import * as config from './config';
import { IngestionPostInterface } from './service.interface';

@Injectable({
    providedIn: 'root'
})
export class IngestionExternalHttpService {
    filter: string = '/dbfilters';
    host: string = config.url.host || 'http://localhost:3000/ingestion/external';
    data: Observable<any> = new Observable();

    constructor(private http: HttpClient){
    }

    get(id, provider){
        let endpoint = this.host;
        endpoint += `/${provider}/${id}`
        
        this.data = this.data.pipe(
            last(),
            merge(
            this.http.get(endpoint).pipe(
                retry(1),
                catchError(this.handler)
            )
        ));
    }

    post(json: IngestionPostInterface, options: Object = {}){

        this.data = this.data.pipe(merge(
            this.http.post(this.host, json, options).pipe(
                catchError(this.handler)
                )
            )
        );
    }

    configure({ids, names, headers, providers}){
        const params = this.basicValidation(ids, names);
        if(params.names.length === 0 && providers.length === 1 && headers.length === 0 && params.ids.length === 1){
            this.get(ids[0], providers[0]);
        }else{
            // replace headers with an object to enable search by psuedo bool and filter properties array
            this.post({params, options:{headers, providers}})
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
}