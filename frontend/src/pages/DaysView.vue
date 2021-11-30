<template>
  <div class="daysViewContainer">
    <tool-bar class="topOfContextStack"></tool-bar>
    <div class="locationContainer">
      <h2>
        <span class="greyText" style="marginRight: 0.3rem"
          >Været framover i</span
        >
        {{ location }}
      </h2>
    </div>
    <div class="dayBlocks">
      <day-block color="light" :data="day1"></day-block>
      <day-block :data="day2"></day-block>
      <day-block color="light" :data="day3"></day-block>
      <day-block :data="day4"></day-block>
    </div>
  </div>
</template>

<script>
import ToolBar from "../components/layout/ToolBar.vue";
import DayBlock from "../components/layout/days_view/DayBlock.vue";
import { getSummary, getHighestAndLowest } from "../helpers/weather.ts";

export default {
  components: { ToolBar, DayBlock },
  data() {
    return {
      location: "Oslo",
      day1: [],
      day2: [],
      day3: [],
      day4: [],
    };
  },
  mounted() {
    if (
      //If there's no forecast in state, get it
      this.allForecastInState &&
      Object.keys(this.allForecastInState).length === 0 &&
      Object.getPrototypeOf(this.allForecastInState) === Object.prototype
    ) {
      this.$store.dispatch("today/getWeather");
    } else {
      //Otherwise, load in the next 4 days
      this.getSetForecastNextFourDays();
      this.filterOnDate();
    }
  },
  computed: {
    chosenLocation() {
      const location = this.$store.getters["today/chosenLocation"];
      return location ? location : "Oslo";
    },
    allForecastInState() {
      return this.$store.getters["today/forecast"];
    },
    forecastNextFourDays() {
      return this.$store.getters["future/getForecastNextFourDays"];
    },
  },
  watch: {
    allForecastInState(newForecast) {
      this.getSetForecastNextFourDays(newForecast);
    },
    forecastNextFourDays() {
      this.filterOnDate();
    },
    chosenLocation(newLocation) {
      this.$store.dispatch("today/getWeather");
      this.location = newLocation.location;
    },
  },
  methods: {
    getSetForecastNextFourDays(newForecast) {
      let forecast = newForecast;
      //Once all forecast entries are loaded, get and set the ones regarding the next 4 days
      if (!forecast) {
        forecast = this.allForecastInState;
      }
      const today = new Date();
      const fourDaysFromNow = new Date(today.setDate(today.getDate() + 3));
      const timeseriesInRange = forecast.properties.timeseries.filter(
        (item) => new Date(item.time) <= fourDaysFromNow
      );
      this.$store.dispatch("future/setForecast", timeseriesInRange);
    },
    filterOnDate() {
      this.location =
        typeof this.chosenLocation === "object"
          ? this.chosenLocation.location
          : this.chosenLocation;
      const forecastInState = this.forecastNextFourDays;
      if (forecastInState.length !== 0) {
        const firstItemDate = new Date(forecastInState[0].time).getDate();

        const day1 = forecastInState.filter(
          (item) => new Date(item.time).getDate() === firstItemDate
        );
        const day2 = forecastInState.filter(
          (item) =>
            new Date(item.time).getDate() ===
            new Date(new Date().setDate(firstItemDate + 1)).getDate()
        );
        const day3 = forecastInState.filter(
          (item) =>
            new Date(item.time).getDate() ===
            new Date(new Date().setDate(firstItemDate + 2)).getDate()
        );
        const day4 = forecastInState.filter(
          (item) =>
            new Date(item.time).getDate() ===
            new Date(new Date().setDate(firstItemDate + 3)).getDate()
        );

        const filteredOnDate = [[...day1], [...day2], [...day3], [...day4]];

        const weekdays = [
          "Søndag",
          "Mandag",
          "Tirsdag",
          "Onsdag",
          "Torsdag",
          "Fredag",
          "Lørdag",
        ];

        for (let i = 0; i < filteredOnDate.length; i++) {
          if (filteredOnDate[i].length !== 0) {
            const timeserie = filteredOnDate[i][0];
            const date = new Date(timeserie.time);

            const weekday = i === 0 ? "I dag" : weekdays[date.getDay()];
            const icon = timeserie.data.next_12_hours
              ? timeserie.data.next_12_hours.summary.symbol_code
              : timeserie.data.next_6_hours
              ? timeserie.data.next_6_hours.summary.symbol_code
              : timeserie.data.next_1_hours.summary.symbol_code;
            const highAndLow = getHighestAndLowest(filteredOnDate[i]);
            const summaryTemp =
              i === 0
                ? Math.round(timeserie.data.instant.details.air_temperature)
                : this.averageTemp(highAndLow.lowest, highAndLow.highest);

            filteredOnDate[i].unshift({
              //Add summary object to beginning of array
              weekday,
              icon,
              summary: getSummary(icon),
              high: highAndLow.highest,
              low: highAndLow.lowest,
              summaryTemp,
            });
          }

          this.day1 = filteredOnDate[0];
          this.day2 = filteredOnDate[1];
          this.day3 = filteredOnDate[2];
          this.day4 = filteredOnDate[3];
        }
      }
    },
    averageTemp(temp1, temp2) {
      return Math.floor((temp1 + temp2) / 2);
    },
  },
};
</script>

<style scoped>
.daysViewContainer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--bg-color-primary);
  display: flex;
  flex-wrap: wrap;
}

.locationContainer {
  color: var(--text-color-primary);
  text-align: center;
  width: 100%;
}

h2 {
  font-size: 1rem;
  margin-top: 0;
}

.greyText {
  color: var(--grey-text-dark);
}

.dayBlocks {
  display: flex;
  width: 100%;
  height: calc(100% - 10.9rem);
  align-items: stretch;
}

.dayBlocks > * {
  flex: 1;
}

.topOfContextStack {
  z-index: 10;
}

@media only screen and (max-width: 1300px) {
  .dayBlocks > :nth-child(4) {
    display: none;
  }
}

@media only screen and (max-width: 700px) {
  .dayBlocks {
    flex-direction: column;
  }
}
</style>
