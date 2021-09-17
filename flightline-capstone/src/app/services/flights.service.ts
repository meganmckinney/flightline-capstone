import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Flights } from '../model/flights';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private flightUrl: string = 'http://localhost:8082/api/flights/';

  flight: Flights[] | any;
  httpOptions = {};

  constructor(private readonly http: HttpClient) {}

  getFlights() {
    return this.http.get<Flights[]>(this.flightUrl);
  }

  deleteFlights(id: number) {
    return this.http.delete<Flights>(this.flightUrl + id)
  }

  addFlight(flight: any): Observable<Flights> {
    console.log('beep');
    return this.http.post<Flights>(this.flightUrl, flight);
  }

  getFlightById(id: number): Observable<Flights> {
    return this.http.get<Flights>(this.flightUrl + id);
  }

  updateFlight(flight: Flights): Observable<Flights> {
    return this.http.put<Flights>(this.flightUrl, flight);

  }


}
