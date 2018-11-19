import {Component, Input, OnInit} from '@angular/core';
import {Weather} from '../weather.model';
import {Store} from '@ngrx/store';
import {AppState} from '../redux/app.state';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css']
})

export class WeatherTableComponent implements OnInit {

  @Input() weather: Weather;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }
}
