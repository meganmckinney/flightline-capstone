import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { FlightDetailsComponent } from './add-flight/add-flight.component.spec';
import { FlightsComponent } from './flights/flights.component';
import { MainComponent } from './main/main.component';

const indexRoute: Route = {
  path: "",
  component: FlightsComponent
}

const fallbackRoute: Route = {
  path: '*', component: MainComponent
}

const routes: Routes = [
  indexRoute,
  { path: '', component: FlightDetailsComponent},
  fallbackRoute,
]
