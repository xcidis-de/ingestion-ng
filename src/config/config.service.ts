import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ExternalHttpService {
    filter: string = '/dbfilters';
    host: string;

    constructor(private http: HttpClient, host: string = 'localhost:3000'){
        this.host = host;
    }

    get(feature: string, options: Object){
        let endpoint = this.host;
        if(feature === 'filter'){
            endpoint += this[feature]
            return this.http.get(endpoint, options); 
        }

        endpoint += feature
        return this.http.get(endpoint, options).pipe(
            retry(1),
            catchError(this.handler)
        )
    }

    post(json: JSON, options: Object = {}){
        return this.http.post(this.host, json, options).pipe(
            catchError(this.handler)
        );
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