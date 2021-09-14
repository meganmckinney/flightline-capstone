import { Component, OnInit } from '@angular/core';
import { Flights } from '../model/flights';
import { FlightsService } from '../services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  // private flightsService: FlightsService;
  //private flights: Flights;

  constructor(flightsService: FlightsService) {
    // this.flightsService = flightsService.getFlights().subscribe((flights: Flights) => this.flights = {
    //   flightId: flights.flightId,
    //   cabinClass: flights.cabinClass,
    //   airlineName: flights.airlineName,
    //   flyTo: flights.flyTo,
    //   flyFrom: flights.flyFrom,
    //   ticketPrice: flights.ticketPrice,
    //   maxFlightSize: flights.maxFlightSize,
    //   passengers: flights.passengers
    // })
  }

  ngOnInit(): void {
  }

  showFlights(){

  }

}
