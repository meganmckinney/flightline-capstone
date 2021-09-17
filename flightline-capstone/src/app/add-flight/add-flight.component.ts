import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flights } from '../model/flights';
import { FlightsService } from '../services/flights.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  isLoading: boolean = false;
  flightsForm: FormGroup | any;
  flights: Flights[] | any;
  ngOnDestroy$ = new Subject();
  items = this.flightsService.getFlights();
  constructor(private readonly flightsService: FlightsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getFlights();
    this.flightsForm = this.fb.group({
      flyFrom: ['', [Validators.required, Validators.minLength(5)]],
      flyTo: ['', [Validators.required, Validators.minLength(5)]],
      cabinClass: ['', [Validators.required, Validators.minLength(5)]],
      ticketPrice: ['', [Validators.required]],
      maxFlightSize: ['', [Validators.required, Validators.minLength(5)]],
      airlineName: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  getFlights() {
    this.flightsService.getFlights().pipe(takeUntil(this.ngOnDestroy$)).subscribe((res: Flights[]) => {
      this.flights = res;
    });
  }

  addFlight(flight: any) {
    this.flightsService.addFlight(this.flights).subscribe(flight => this.flights.push(flight));
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
  }

  onSubmit(event: any): void {
    if(this.flightsForm.valid) {
      this.flightsService.addFlight(this.flightsForm.value).subscribe(res => console.log(res), err => console.error(err));
      this.flightsForm.reset();
    }
  }
}
