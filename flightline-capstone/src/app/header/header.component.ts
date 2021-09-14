import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
