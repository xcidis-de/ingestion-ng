import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class CrapomeDataInjectionService {
    cache = {};

    set(name, item){
        if(!this.cache[item]){
            this.cache[name] = item;
            return true;
        }else{
            //write error
            return item;
        }
    }

    get(name){
        const item = this.cache[name];
        delete this.cache[name];
        return item;
    }
}