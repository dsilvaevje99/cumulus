export interface Temps {
  lowest: Number;
  highest: Number;
}

interface Properties {
  meta: any;
  timeseries: Array<object>;
}
export interface Forecast {
  geometry: any;
  properties: Properties;
}
