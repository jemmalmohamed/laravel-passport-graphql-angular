import { ErrorHandlerService } from './../error-handler.service';
import { SPECIALS_QUERY } from './../queries/specialQueries';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {


  specials = [];
  constructor(
    private _eventService: EventService,
    private _router: Router,
    private _errorHandlerService: ErrorHandlerService
  ) {

  }
  ngOnInit() {
    this._eventService.getSpecials(SPECIALS_QUERY)
      .subscribe(
        (res: any) => {
          this.specials = res.data.specials;
          console.log(this.specials);
        },
        (err) => {
          this._errorHandlerService.handleError(err);
          console.log(err);
        }
      )

  }

}
