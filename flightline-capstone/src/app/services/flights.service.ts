import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Flights } from '../model/flights';



@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private flightUrl: string = 'http://localhost:8082/api/flights'
  options = {observe: 'body', responseType: 'json'};

  constructor(private readonly http: HttpClient) {}

  getFlights() {
    return this.http.get<Flights[]>(this.flightUrl);
  }


}

