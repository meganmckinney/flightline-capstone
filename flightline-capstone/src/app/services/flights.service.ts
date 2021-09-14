import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Flights } from '../model/flights';



@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  // flights: Flights
  options = {};

  //private $flights: Observable<Object>;
  constructor(private http: HttpClient) {
    // this.$flights = this.http.get('/api/flights');
  }

  ngOnInit(){




  }

  // getFlights() {
  //   return this.http.get<Flights>('/api/flights', this.options);

  //   // this.http.get('/api/flights').subscribe(res => {
  //   //   this.data.next(res);
  //   // })

  // }
}
//     let flights = this.http.get('/api/flights').subscribe(res => {
//       res.

//     },
//     err => {

//     });
//     return flights;
//   }
// }
