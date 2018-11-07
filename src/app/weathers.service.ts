import {Store} from '@ngrx/store';
import {Weather} from './weather.model';
import {AppState} from './redux/app.state';
import { LoadWeathers} from './redux/weather.action';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export  class  WeathersService {

  static  BASE_URL = 'http://localhost:3000/'

  constructor(private http: HttpClient, private store: Store<AppState>) {}
  loadWeather() {
    this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=Lviv,ua&units=metric&lang=ua&appid=38da3347d6a792ae46c080200e8c20f2')
      .pipe(map(data => {
        const weathersList = data['list'];
        return  weathersList.map(function( weath: any ) {
          return{dt_txt: weath.dt_txt, temp: weath.main.temp , clouds: weath.weather[0].main, wind: weath.wind.speed };
      });
      }))
      .subscribe((weathers: Weather[]) => {
      this.store.dispatch(new LoadWeathers(weathers));
    });
  }

}
