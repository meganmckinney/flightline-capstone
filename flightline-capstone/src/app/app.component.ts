import { Component } from '@angular/core';
import { FlightsComponent } from './flights/flights.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flightline';

  ngOnInit() {
    //console.log();
  }
}
