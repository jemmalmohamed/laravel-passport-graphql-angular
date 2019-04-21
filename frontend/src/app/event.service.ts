import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private _apollo: Apollo) { }

  getEvents(query) {
    return this._apollo.watchQuery({
      query: query
    });
  }
  getSpecials(query) {
    return this._apollo.query({
      query: query
    });
  }

}
