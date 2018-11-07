import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import {StoreModule} from '@ngrx/store';
import {weatherReduser} from './redux/weather.reducer';
import {HttpClientModule} from '@angular/common/http';
import {WeathersService} from './weathers.service';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

@NgModule({
  declarations: [
    AppComponent,
    WeatherTableComponent,
    WeatherFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({weatherPage: weatherReduser}),
    IonRangeSliderModule
  ],
  providers: [WeathersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
