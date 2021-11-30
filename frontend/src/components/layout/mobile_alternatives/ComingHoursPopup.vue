<template>
  <div class="hoursPopupContainer">
    <div class="flexBox">
      <h3>
        <base-icon icon="clock"></base-icon>
        Time for time
      </h3>
      <base-icon icon="close" @click="closePopup" class="closeIcon"></base-icon>
    </div>
    <table>
      <tr v-for="item in timeseries" :key="item.hour">
        <td class="greyText">{{ item.hour }}</td>
        <td>{{ item.degrees }}<span v-if="item.degrees !== null">℃</span></td>
        <td v-if="item.summary !== null">
          <base-icon :icon="item.summary"></base-icon>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { timezoneAdjust } from "../../../helpers/timezone.ts";

export default {
  props: ["closePopup"],
  data() {
    return {
      timeseries: [],
    };
  },
  mounted() {
    if (Object.keys(this.forecastInState).length !== 0) {
      this.getTimeseries();
    }
  },
  computed: {
    forecastInState() {
      return this.$store.getters["today/forecast"];
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
  watch: {
    forecastInState() {
      this.getTimeseries();
    },
  },
  methods: {
    async getTimeseries() {
      const rawData = this.forecastInState.properties.timeseries;
      const todayData = rawData.filter((item) => this.isToday(item.time));
      let timeseries = [];
      let hourTracker = 0;

      if (todayData.length < 12) {
        //SHOW NEXT 12 HOURS
        for (let i = 0; i < 12; i++) {
          let timeserie = rawData[i];
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
            summary: timeserie.data.next_1_hours.summary.symbol_code,
          });

          hourTracker++;
          if (hourTracker >= 24) {
            hourTracker = 0;
            timeseries.push({
              hour: "I morgen",
              degrees: null,
              summary: null,
            });
          }
        }
      } else {
        //SHOW REST OF DAY
        for (let i = 0; i < todayData.length; i++) {
          let timeserie = todayData[i];
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
            summary: timeserie.data.next_1_hours.summary.symbol_code,
          });

          hourTracker++;
          if (hourTracker >= 24) {
            hourTracker = 0;
          }
        }
      }

      this.timeseries = timeseries;
    },
    isToday(timestamp) {
      const date = new Date(timestamp);
      const today = new Date();
      return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      );
    },
  },
};
</script>

<style scoped>
.hoursPopupContainer {
  background-color: var(--bg-color-secondary);
  color: var(--text-color-primary);
  padding: 1em 3rem 2rem 3rem;
  height: auto;
  max-height: 80vh;
  overflow-y: overlay;
  border-radius: 1rem 1rem 0 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.flexBox {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.closeIcon {
  cursor: pointer;
  font-size: 1.3em;
  margin: 0;
}

table {
  width: 60%;
  overflow: scroll;
}

td {
  width: 33%;
  padding: 0.5rem 0;
}

.greyText {
  opacity: 0.5;
}

@media only screen and (max-width: 600px) {
  table {
    width: 75%;
  }
}

@media only screen and (max-width: 400px) {
  table {
    width: 100%;
  }
}
</style>
