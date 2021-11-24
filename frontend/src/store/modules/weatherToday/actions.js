export default {
  async getWeather({ commit, state }) {
    let location = state.chosenLocation;
    if (!location) {
      //Set Oslo as location by default if no other place is chosen
      location = {
        lat: "59.9133301",
        lon: "10.7389701",
        location: "Oslo",
      };
    }

    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.lat}&lon=${location.lon}`
    );
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || "Failed to fetch!");
      throw error;
    }

    commit("setForecast", resData);
  },
  setLocation(context, payload) {
    context.commit("setChosenLocation", payload);
  },
};
