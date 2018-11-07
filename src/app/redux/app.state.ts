import {Weather} from '../weather.model';

export interface AppState {
  weatherPage: {
     weathers: Weather[];
    showWeathers: Weather[];
};
}

