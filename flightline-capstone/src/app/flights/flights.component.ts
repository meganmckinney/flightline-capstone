import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flights } from '../model/flights';
import { FlightsService } from '../services/flights.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})

export class FlightsComponent implements OnInit {

  isLoading: boolean = false;
  flights: Flights[] = [];
  ngOnDestroy$ = new Subject();

  constructor(private readonly flightsService: FlightsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights() {
    this.flightsService.getFlights().pipe(takeUntil(this.ngOnDestroy$)).subscribe((res: Flights[]) => {
      this.flights = res;
    });
  }

  deleteFlights(event: Flights) {
    if(event.flightId) {
      this.flightsService.deleteFlights(event.flightId).subscribe(() =>
        {
          this.flights = this.flights.filter(flight => flight.flightId !== event.flightId);
        },
        err => console.error(err));
    }
  }

  editFlights(flights: Flights) {
    this.router.navigate(['/edit', flights.flightId]);
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
  }
}
