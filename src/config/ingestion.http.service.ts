import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import * as config from './config';
import { IngestionPostInterface } from './service.interface';

@Injectable()
export class IngestionExternalHttpService {
    filter: string = '/dbfilters';
    host: string = config.url.host || 'http://localhost:3000/ingestion/external';

    constructor(private http: HttpClient){
        this.http = http
    }

    get(id, provider){
        console.log('ok');
        let endpoint = this.host;
        endpoint += `/${provider}/${id}`
        return this.http.get(endpoint).pipe(
            retry(1),
            catchError(this.handler)
        )
    }

    post(json: IngestionPostInterface, options: Object = {}){

        const response: Observable<any> = this.http.post(this.host, json, options).pipe(
            catchError(this.handler)
        );

        return response;
    }

    configure(ids: string[], names: string[], classNames: string[], providers: string[]){
        const params = this.basicValidation(ids, names);
        if(params.name.length === 0 && providers.length === 1 && classNames.length === 0 && params.id.length === 1){
            return this.get(ids[0], providers[0]);
        }else{
            // replace headers with an object to enable search by psuedo bool and filter properties array
            return this.post({params, options:{headers: classNames, providers}})
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