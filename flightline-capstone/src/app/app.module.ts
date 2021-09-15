import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'primeng/api';
import { FlightsComponent } from './flights/flights.component';
import { FlightsService } from './services/flights.service';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    FlightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule,
    HttpClientModule,
    TableModule
  ],
  providers: [ FlightsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
