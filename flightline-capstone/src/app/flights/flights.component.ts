import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flights } from '../model/flights';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})

export class FlightsComponent implements OnInit {
  flights: Flights[] | any;
  ngOnDestroy$ = new Subject();
  object = {};
  constructor(private readonly flightsService: FlightsService) {}

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights() {
    this.flightsService.getFlights().pipe(takeUntil(this.ngOnDestroy$)).subscribe((res: Flights[]) => {
      this.flights = res;
    });
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
  }
}
