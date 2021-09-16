import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  name: string = 'Flightline';
  router: Router

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {}

  addUserButton() {
    this.router.navigateByUrl('/add');
};
}
