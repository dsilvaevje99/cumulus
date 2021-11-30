export default {
  setForecast(state: any, payload: any) {
    state.forecastNextFourDays = payload;
  },
};
