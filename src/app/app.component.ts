import {Component, OnInit} from '@angular/core';
import {Weather, Weathers} from './weather.model';
import {Store} from '@ngrx/store';
import {AppState} from './redux/app.state';
import {fromEvent, Observable} from 'rxjs';
import {WeathersService} from './weathers.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'weather-app';
   public weatherss: Weather[] = [];
  public  weatherState: Observable<Weathers>;
  public weatherForm = false;

constructor(private  store: Store<AppState>, private service: WeathersService) {}

ngOnInit() {
  this.service.loadWeather();
  this.store.subscribe(a => {
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['wind', 0].concat((a.weatherPage.showWeathers.map(p => p.wind))),
        ['temp', 0].concat((a.weatherPage.showWeathers.map(p => p.temp)))
  ]
      }
    });
  });
  // ==============================================
  fromEvent(document.getElementById('FilterWeather'), 'click')
    .subscribe(res => this.weatherForm = true);
  // ==============================================

this.weatherState = this.store.select('weatherPage');
}
  onAdd(weather: Weather) {
    this.weatherss.push(weather);
  }
}
