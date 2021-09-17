import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card'
import { PanelModule } from 'primeng/panel'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'primeng/api';
import { FlightsComponent } from './flights/flights.component';
import { FlightsService } from './services/flights.service';
import { TableModule } from 'primeng/table';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FlightsComponent,
    AddFlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    BrowserAnimationsModule,
    PanelModule,
    ProgressSpinnerModule
  ],
  providers: [ FlightsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
