import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { FlightsComponent } from './flights/flights.component';

const indexRoute: Route = {
  path: '',
  component: FlightsComponent
}

const fallbackRoute: Route = {
  path: '*', component: FlightsComponent
}

const routes: Routes = [
  indexRoute,
  { path: '/add', component: AddFlightComponent },
  fallbackRoute,
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
