import {Action} from '@ngrx/store';
import {Weather} from '../weather.model';

export namespace WEATHER_ACTION {
  export const  LOAD_WHEDER = 'LOAD_WEATHER';
  export const  FIND_WHEDER = 'FIND_WEATHER';
}

export class LoadWeathers implements Action {
  readonly type = WEATHER_ACTION.LOAD_WHEDER;
  constructor(public  payload: Weather[]) {}
}

export class FindWeathers implements Action {
  readonly type = WEATHER_ACTION.FIND_WHEDER;
  constructor(public  tempMin: number,
              public  tempMax: number,
              public  windMin: number,
              public  windMax: number,
              public wetherSelect: string) { }
}

export  type WeatherAction = LoadWeathers | FindWeathers;
