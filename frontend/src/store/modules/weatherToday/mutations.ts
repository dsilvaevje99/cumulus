export default {
  setForecast(state: any, payload: any) {
    state.forecast = payload;
  },
  setChosenLocation(state: any, payload: any) {
    state.chosenLocation = payload;
  },
};
