import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class CrapomeDataInjectionService {
    cache = {};
    private table = {}
    private view = [];
    public length: number;
    private indexedKeys: string[];

    set(name:string, item: any){
        if(!this.cache[item]){
            this.cache[name] = item;
            return true;
        }else{
            //write error
            return item;
        }
    }

    get(name: string){
        const item = this.cache[name];
        delete this.cache[name];
        return item;
    }



    insertTable(tableData: {[x:string]: Object}){
        this.table = tableData;
        this.indexedKeys = Object.keys(this.table).sort();
        this.length = this.indexedKeys.length;
        for(let i = 0; i < 15; i++){
            this.view.push({
                data: this.table[this.indexedKeys[i]], 
                gene: this.indexedKeys[i]
            });
        }
        
    }

    viewTable(index: number): Array<Object> {
        if(index > this.indexedKeys.length - 15 || index < 0){
            return this.view
        }else{
            this.view = [];
            for(let i = index; i < index + 15; i++){
                let key = this.indexedKeys[i];
                this.view.push({data: this.table[key], gene: key});
            }
            
            return this.view
        }
    }

    download(){
        var newBlob = new Blob([JSON.stringify(this.table)], { type: "application/json" });
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = "polus_experiments.json";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);

    }
}