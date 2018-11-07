export class Weather {
  public  dt_txt: string;
  public  temp: number;
  public  clouds: string;
  public  wind: number;

  constructor(dt_txt: string, temp: number, clouds: string, wind: number) {
    this.dt_txt = dt_txt;
    this.temp = temp;
    this.clouds = clouds;
    this.wind = wind;
  }
}

export interface Weathers {
  weathers: Weather[];
  showWeathers: Weather[];
}

