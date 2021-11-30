<template>
  <div :class="`container ${color}`">
    <div v-if="summary.length !== 0" class="summaryContainer">
      <p>{{ summary.weekday }}</p>
      <div class="flexContainer bigText">
        <div><base-icon :icon="summary.icon"></base-icon></div>
        <div>
          <p>{{ summary.summaryTemp }}℃</p>
        </div>
      </div>
      <p class="greyText">
        Det blir for det meste {{ summary.summary }} <br />
        og mellom {{ summary.low }}℃ og {{ summary.high }}℃
      </p>
    </div>
    <div v-if="formattedForecast.length !== 0" class="forecastContainer">
      <table>
        <tr v-for="item in formattedForecast" :key="item.hour">
          <td class="greyText">{{ item.hour }}</td>
          <td>{{ item.degrees }}℃</td>
          <td>
            <base-icon :icon="item.summary"></base-icon>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { timezoneAdjust } from "../../../helpers/timezone.ts";

export default {
  props: ["color", "data"],
  data() {
    return {
      summary: [],
      formattedForecast: [],
    };
  },
  watch: {
    data(newData) {
      this.summary = newData[0];
      this.formatForecast(this.forecast);
    },
  },
  computed: {
    forecast() {
      let forecast = [...this.data];
      forecast.shift(); //remove first item in array (summary)
      return forecast;
    },
    selectedCountry() {
      const location = this.$store.getters["today/chosenLocation"];
      if (location) {
        const split = location.location.split(",");
        if (split.length > 1) {
          return split[1].trim();
        } else {
          return "Norway";
        }
      } else {
        return "Norway";
      }
    },
    selectedPlaceCoordinates() {
      const location = this.$store.getters["today/chosenLocation"];
      return [location.lat, location.lon];
    },
  },
  methods: {
    async formatForecast(data) {
      let timeseries = [];
      let hourTracker = 0;

      for (let i = 0; i < data.length; i++) {
        let timeserie = data[i];
        const date = new Date(timeserie.time);
        let hour = date.getHours();
        if (i === 0) {
          hourTracker = hour;
        }
        if (this.selectedCountry !== "Norway" && i === 0) {
          //Only adjust first hour to prevent unncessesary API calls
          let timezoneAdjusted = await timezoneAdjust(
            ...this.selectedPlaceCoordinates,
            date.getTime()
          );
          hourTracker = timezoneAdjusted;
        }

        timeseries.push({
          hour: hourTracker < 10 ? "0" + hourTracker : hourTracker,
          degrees: Math.round(timeserie.data.instant.details.air_temperature),
          summary: timeserie.data.next_1_hours
            ? timeserie.data.next_1_hours.summary.symbol_code
            : timeserie.data.next_6_hours
            ? timeserie.data.next_6_hours.summary.symbol_code
            : timeserie.data.next_12_hours.summary.symbol_code,
        });

        hourTracker++;
        if (hourTracker >= 24) {
          hourTracker = 0;
        }
      }

      this.formattedForecast = timeseries;
    },
  },
};
</script>

<style scoped>
.container {
  color: var(--text-color-primary);
  text-align: center;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.light {
  background-color: var(--bg-color-tertiary);
}

.summaryContainer {
  flex: 0 1 auto;
}

.flexContainer {
  display: flex;
  width: max-content;
  margin: 0 auto;
  align-items: center;
}

.greyText {
  color: var(--grey-text-light);
}

.bigText {
  font-size: 4em;
  font-weight: bold;
  margin: 1rem auto;
}

.forecastContainer {
  height: auto;
  max-height: 100%;
  overflow-y: overlay;
  margin: 2rem 0 1rem 0;
}

p {
  margin: 0;
}

table {
  width: 100%;
  text-align: left;
}

td {
  width: 33%;
  padding: 0.5rem 0;
}

@media only screen and (max-width: 1000px) {
  .bigText {
    font-size: 2.5em;
  }
}
</style>
