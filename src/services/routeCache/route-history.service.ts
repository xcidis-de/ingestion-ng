import { Injectable } from '@angular/core'

@Injectable()
export class RouteHistoryService {
  list = [];

  add(query){
    this.list.push(query);
  }
}
