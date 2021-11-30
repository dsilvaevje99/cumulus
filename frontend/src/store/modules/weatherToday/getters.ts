import { getSummary } from "../../../helpers/weather";

export default {
  forecast(state: any) {
    return state.forecast;
  },
  highAndLow(state: any) {
    const timeseries = state.forecast.properties.timeseries;
    const today = new Date().getDate();

    let lowest = 100;
    let highest = -100;

    timeseries.forEach((timeserie: any) => {
      if (new Date(timeserie.time).getDate() === today) {
        const temp = timeserie.data.instant.details.air_temperature;
        if (temp < lowest) {
          lowest = Math.round(temp);
        }
        if (temp > highest) {
          highest = Math.round(temp);
        }
      }
    });

    return { lowest, highest };
  },
  summary(state: any) {
    const summaryToday =
      state.forecast.properties.timeseries[0].data.next_12_hours.summary
        .symbol_code;

    return getSummary(summaryToday);
  },
  chosenLocation(state: any) {
    return state.chosenLocation;
  },
};
