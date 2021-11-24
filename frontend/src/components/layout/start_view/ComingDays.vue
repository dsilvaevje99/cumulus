<template>
  <div>
    <h3>
      <base-icon icon="calendar"></base-icon>
      Dagene fremover
    </h3>
    <table>
      <tr v-for="item in forecast" :key="item.weekday">
        <td>{{ item.weekday }}</td>
        <td><base-icon :icon="item.icon"></base-icon></td>
        <td class="summary greyText">
          <span class="staticPrefix">For det meste</span> {{ item.summary }}
        </td>
        <td>
          {{ item.low }}℃ <span class="greyText slashPadding">/</span>
          {{ item.high }}℃
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getSummary } from "../../../helpers/weather.js";

export default {
  data() {
    return {
      forecast: [],
    };
  },
  mounted() {
    if (Object.keys(this.forecastInState).length !== 0) {
      this.getForecast();
    }
  },
  computed: {
    forecastInState() {
      return this.$store.getters["today/forecast"];
    },
  },
  watch: {
    forecastInState() {
      this.getForecast();
    },
  },
  methods: {
    getForecast() {
      const timeseries = this.forecastInState.properties.timeseries;
      const now = new Date();
      const tomorrow = new Date(now.setDate(now.getDate() + 1));
      const fourDaysFromNow = new Date(now.setDate(now.getDate() + 3));
      const timeseriesInRange = timeseries.filter(
        (item) =>
          new Date(item.time) >= tomorrow &&
          new Date(item.time) <= fourDaysFromNow
      );

      let forecast = []; //Initialize return array

      const weekdays = [
        "Søndag",
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag",
      ];
      let dateTracker = [];
      timeseriesInRange.forEach((timeserie) => {
        const date = new Date(timeserie.time);
        if (!dateTracker.includes(date.getDate())) {
          const weekday = weekdays[date.getDay()];
          const icon = timeserie.data.next_12_hours
            ? timeserie.data.next_12_hours.summary.symbol_code
            : timeserie.data.next_1_hours.summary.symbol_code;
          const highAndLow = this.highAndLow(date);

          forecast.push({
            weekday,
            icon,
            summary: getSummary(icon),
            high: highAndLow.highest,
            low: highAndLow.lowest,
          });

          dateTracker.push(date.getDate());
        }
      });

      this.forecast = forecast;
    },
    highAndLow(timestamp) {
      const timeseries = this.forecastInState.properties.timeseries;
      const date = new Date(timestamp).getDate();
      const timeseriesInDate = timeseries.filter(
        (item) => new Date(item.time).getDate() === date
      );

      let lowest = 100;
      let highest = -100;

      timeseriesInDate.forEach((timeserie) => {
        const temp = timeserie.data.instant.details.air_temperature;
        if (temp < lowest) {
          lowest = Math.round(temp);
        }
        if (temp > highest) {
          highest = Math.round(temp);
        }
      });

      return { lowest, highest };
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}

td {
  width: auto;
  padding: 0.5rem 0;
}

.summary {
  width: 50%;
}

.summary:first-letter {
  text-transform: capitalize;
}

.greyText {
  opacity: 0.5;
}

.slashPadding {
  padding: 0 0.3rem;
}

/* Style changes for tab-info-area */
@media only screen and (max-width: 1308px) {
  h3 {
    display: none;
  }

  @media only screen and (min-width: 1000px) {
    table {
      width: 60%;
    }
  }
}

@media only screen and (max-width: 450px) {
  .staticPrefix {
    display: none;
  }
}

@media only screen and (max-height: 700px) {
  table > :nth-child(4n) {
    display: none;
  }
}

@media only screen and (max-height: 660px) {
  table > :nth-child(3n) {
    display: none;
  }
}
</style>
