import {Component, OnInit} from '@angular/core';
import {Weather} from '../weather.model';
import {AppState} from '../redux/app.state';
import {Store} from '@ngrx/store';
import {FindWeathers } from '../redux/weather.action';
import {WeathersService} from '../weathers.service';
import {fromEvent,  from} from 'rxjs';
import {min, max} from 'rxjs/operators';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})

export class WeatherFormComponent implements OnInit {
  public findTempMin: number;
  public findTempMax: number;
  public findWindMin: number;
  public findWindMax: number;

  MinTemp = 0;
  MaxTemp = 100;
  fromTemp = 0;
  toTemp = 0;
  MinWind = 0;
  MaxWind = 100;
  fromWind = 0;
  toWind = 0;

  weathers: Weather[];
  clouds = [];
  weathSelect: string;
  LoadAllWeather = true;

  constructor(private  store: Store<AppState>, private service: WeathersService) {
  }

ngOnInit() {
      this.store.subscribe(a => this.weathers = a.weatherPage.weathers);
      this.clouds = this.distinctUntil(this.weathers.map(c => c.clouds));
       this.weathSelect = this.clouds[0];
      from(this.weathers.map(c => c.wind)).pipe(min()).subscribe(t => this.fromWind = this.MinWind = t);
      from(this.weathers.map(c => c.wind)).pipe(max()).subscribe(t => this.toWind = this.MaxWind = t);
      from(this.weathers.map(c => c.temp)).pipe(min()).subscribe(t => this.fromTemp =  this.MinTemp = t);
      from(this.weathers.map(c => c.temp)).pipe(max()).subscribe(t => this.toTemp = this.MaxTemp = t);

      fromEvent(document.getElementById('FindWeather'), 'click')
     .subscribe(() => {this.store.dispatch(new FindWeathers(this.findTempMin,
                                                                   this.findTempMax,
                                                                   this.findWindMin,
                                                                   this.findWindMax,
                                                                   this.weathSelect));
                               this.LoadAllWeather = true;
      });

  }

find() {
      this.store.dispatch(new FindWeathers(this.findTempMin, this.findTempMax, this.findWindMin, this.findWindMax, this.weathSelect));
  }

myOnChangeTemp(event) {
    this.findTempMin = event.from;
    this.findTempMax = event.to;
    this. find();
  }

myOnChangeWind(event) {
    this.findWindMin = event.from;
    this.findWindMax = event.to;
    this. find();
  }

onChangeWeath() {
    this. find();
  }

  onLoad() {
    this.service.loadWeather();
     this.LoadAllWeather = false;
  }

  distinctUntil(arr) {
    let arrRez = [arr[0]];
    let temp: boolean;
    for (let i = 0; i < arr.length; i++) {
      temp = true;
      for (let j = 0; j < arrRez.length; j++) {
        if (arrRez[j] === arr[i]) {
          temp = false;
          break;
        }
      }
      if (temp) arrRez.push(arr[i]);
    }
    return arrRez;
  }
}
