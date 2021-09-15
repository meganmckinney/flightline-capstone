import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api'
import { FlightsComponent } from '../flights/flights.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  name: string = 'Flightline';

  constructor() { }


  ngOnInit() {
    //FlightsComponent.getFlights();

      this.items = [
        {
          label: 'Book a flight',
          items: [{
            label: 'By airline',
            icon: 'pi pi-fw pi-plus',
            items: [
              { label: 'Amphibian Airlines' },
              { label: 'Northeast' },
              { label: 'JetBurgundy' },
              { label: 'Lambda Airlines' },
            ]
          },
          { label: 'All flights' }
          ]
        }
    ];
  }

}
