import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // flights: any;

  // constructor(flightsService: FlightsService) {
  //   this.flightsService = flightsService.getFlights();

  // }

  // ngOnInit(flightsService: FlightsService): void {
  //   console.log(this.flights);
  //   flightsService.currentData.subscribe(res => {
  //     this.flights = res;
  //   })
  // }

  ngOnInit () {}
}
