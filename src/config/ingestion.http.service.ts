import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, first } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import * as config from './config';
import { IngestionPostInterface } from './service.interface';

@Injectable({
    providedIn: 'root'
})
export class IngestionExternalHttpService {
    filter: string = '/dbfilters';
    host: string = config.url.host || 'http://localhost:3000/ingestion/external';
    subject: Subject<any> = new Subject();

    constructor(private http: HttpClient){
    }

    get(id, provider){
        let endpoint = this.host;
        endpoint += `/${provider}/${id}`
        
        this.http.get(endpoint).subscribe((data)=>{
            this.subject.next(data);
            
        })
    }

    post(json: IngestionPostInterface, options: Object = {}){
        this.http.post(this.host, json, options).subscribe((data)=>{
           this.subject.next(data);
        })
    }

    pager(headers, provider: string[]){
        this.http.post(this.host + '/page', {headers, provider})
            .subscribe((data)=>{
                this.subject.next(data);
            })
    }

    configure({ids, names, headers, providers}){
        const params = this.basicValidation(ids, names);
        if(params.names.length === 0 && providers.length === 1 && headers.recursive === false && params.ids.length === 1){
            this.get(ids[0], providers[0]);
        }else{
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