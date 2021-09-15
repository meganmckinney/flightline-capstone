import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Flights } from '../model/flights';
import { FlightsService } from '../services/flights.service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: Flights[] | any;
  isLoading = false;
  ngOnDestroy$ = new Subject();
  object = {};
  constructor(private readonly flightsService: FlightsService) {

  }

  ngOnInit(): void {
    this.getFlights();

  }

  getFlights() {
    this.flightsService.getFlights().pipe(takeUntil(this.ngOnDestroy$)).subscribe((res: Flights[]) => {
      this.flights = res;
      console.log(this.flights);
    });
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
  }
}
