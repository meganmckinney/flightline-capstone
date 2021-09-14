import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api'


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
      this.items = [
          {
              label: this.name,
              items: [{
                      label: 'Book a flight',
                      icon: 'pi pi-fw pi-plus',
                      items: [
                          {label: 'By Airline'},
                          {label: 'All Flights'},
                      ]
                  },
              ]
          }
      ];
  }
}
