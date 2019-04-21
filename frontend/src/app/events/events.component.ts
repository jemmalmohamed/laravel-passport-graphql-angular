import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { EVENTS_QUERY } from './../queries';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];
  constructor(
    private _eventService: EventService
  ) {

  }
  ngOnInit() {
    this._eventService.getEvents(EVENTS_QUERY).valueChanges
      .subscribe(
        (res: any) => {
          this.events = res.data.events;
          // console.log(res);
        },
        (err) => {
          // console.log(err);
        }
      );


  }


}
