import {Weather} from '../weather.model';
import {Action} from '@ngrx/store';
import {WEATHER_ACTION, WeatherAction} from './weather.action';

const initialState = {
weathers: [],
  showWeathers: []
  }
export function  weatherReduser(state = initialState, action: WeatherAction ) {
  switch (action.type) {
    case WEATHER_ACTION.LOAD_WHEDER:
      return{
        ...state,
        showWeathers: [...action.payload],
        weathers: [...action.payload]
      }
    case WEATHER_ACTION.FIND_WHEDER:
      return{...state,
        showWeathers: [...state. weathers.filter(c => ( c.temp  >= action.tempMin &&
                                                             c.temp  <= action.tempMax &&
                                                             c.wind  >= action.windMin &&
                                                             c.wind  <= action.windMax &&
                                                             c.clouds === action.wetherSelect  ))]
      }
    default:
      return state;
  }
}
