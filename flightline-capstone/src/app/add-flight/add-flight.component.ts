import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flights } from '../model/flights';
import { FlightsService } from '../services/flights.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  isEdit: boolean = false;
  isLoading: boolean = false;
  flightsForm: FormGroup | any;
  flight: Flights | any;
  ngOnDestroy$ = new Subject();

  constructor(private readonly flightsService: FlightsService, private fb: FormBuilder, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.flightsForm = this.fb.group({
      flyFrom: ['', [Validators.required, Validators.minLength(5)]],
      flyTo: ['', [Validators.required, Validators.minLength(5)]],
      cabinClass: ['', [Validators.required, Validators.minLength(5)]],
      ticketPrice: ['', [Validators.required]],
      maxFlightSize: ['', [Validators.required, Validators.minLength(5)]],
      airlineName: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.route.params.subscribe(params => this.getFlight(params['id']));
  }

  getFlight(id: number) {
    this.flightsService.getFlightById(id).pipe(takeUntil(this.ngOnDestroy$)).subscribe((res: Flights) => {
      this.isEdit = true;
      this.flightsForm.addControl('flightId', this.fb.control(''));
      this.flightsForm.setValue(res);
    });
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
  }

  onSubmit(event: any): void {
    if(this.flightsForm.valid) {
      if(this.isEdit) {
        this.flightsService.updateFlight(this.flightsForm.value).subscribe(res => console.log(res), err => console.error(err));
      } else {
        this.flightsService.addFlight(this.flightsForm.value).subscribe(res => console.log(res), err => console.error(err));
      }
      this.flightsForm.reset();
    }
  }
}
