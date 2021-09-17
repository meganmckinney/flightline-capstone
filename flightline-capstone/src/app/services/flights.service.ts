import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Flights } from '../model/flights';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private flightUrl: string = 'http://localhost:8082/api/flights';

  flight: Flights[] | any;
  httpOptions = {};

  constructor(private readonly http: HttpClient) {}

  getFlights() {
    return this.http.get<Flights[]>(this.flightUrl);
  }

  addFlight(flight: any): Observable<Flights> {
    console.log('beep');
    return this.http.post<Flights>(this.flightUrl, flight);
  }


}
