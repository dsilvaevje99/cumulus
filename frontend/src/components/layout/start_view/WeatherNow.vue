<template>
  <div class="container">
    <section
      v-if="temp !== null && high !== null && low !== null && summary !== null"
    >
      <div>
        <h2>
          <span class="greyText" style="marginRight: 0.3rem">Været nå i</span>
          {{ location }}
        </h2>
      </div>
      <div class="flexContainer">
        <div class="flex alignCenter">
          <base-icon :icon="icon" size="xl"></base-icon>
        </div>
        <div class="flex alignCenter">
          <div>
            <h3>{{ temp }}℃</h3>
            <p>
              Det blir for det meste {{ summary }} {{ dayOrNight }} <br />
              og mellom {{ low }}℃ og {{ high }}℃
            </p>
            <button class="buttonMain" @click="togglePopup">
              Time for time
            </button>
            <teleport to="body">
              <span v-if="showComingHoursPopup">
                <transition name="slide">
                  <coming-hours-popup
                    :closePopup="togglePopup"
                  ></coming-hours-popup>
                </transition>
              </span>
            </teleport>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { Forecast, Temps } from "../../../../types";
import ComingHoursPopup from "../mobile_alternatives/ComingHoursPopup.vue";

export default {
  components: { ComingHoursPopup },
  setup() {
    const store: any = useStore();
    const location: any = ref("Oslo");
    const icon: any = ref("cloud");
    const temp: any = ref();
    const summary: any = ref();
    const low: any = ref();
    const high: any = ref();
    const forecast: any = ref([]);
    const showComingHoursPopup: any = ref(false);
    const chosenLocation: any = computed(
      () => store.getters["today/chosenLocation"]
    );

    const togglePopup = () => {
      showComingHoursPopup.value = !showComingHoursPopup.value;
    };

    const loadForecast = async (): Promise<void> => {
      try {
        await store.dispatch("today/getWeather");

        const newForecast: Forecast = store.getters["today/forecast"];
        const temps: Temps = store.getters["today/highAndLow"];
        const timeseries: Array<any> = newForecast.properties.timeseries;
        const today: Number = new Date().getDate();

        const todaysForecast: Array<any> = [];

        timeseries.forEach((timeserie): void => {
          if (new Date(timeserie.time).getDate() === today) {
            todaysForecast.push(timeserie);
          }
        });

        if (chosenLocation.value) {
          location.value = chosenLocation.value.location;
        }
        temp.value = Math.round(
          todaysForecast[0].data.instant.details.air_temperature
        );
        icon.value = todaysForecast[0].data.next_1_hours.summary.symbol_code;
        summary.value = store.getters["today/summary"];
        low.value = temps.lowest;
        high.value = temps.highest;
        forecast.value = todaysForecast;
      } catch (e) {
        console.error(e);
      }
    };
    watch(chosenLocation, () => loadForecast());
    //On component created
    loadForecast();

    const dayOrNight = computed(() => {
      return summary.value === "sol"
        ? "i dag"
        : icon.value.substr(-5) === "night"
        ? "i natt"
        : "";
    });

    return {
      location,
      icon,
      temp,
      summary,
      low,
      high,
      forecast,
      showComingHoursPopup,
      togglePopup,
      dayOrNight,
    };
  },
  /* components: { ComingHoursPopup },
  data() {
    return {
      location: "Oslo",
      icon: "cloud",
      temp: null,
      summary: null,
      low: null,
      high: null,
      forecast: [],
      showComingHoursPopup: false,
    };
  },
  computed: {
    chosenLocation() {
      return this.$store.getters["today/chosenLocation"];
    },
    dayOrNight() {
      return this.summary === "sol"
        ? "i dag"
        : this.icon.substr(-5) === "night"
        ? "i natt"
        : "";
    },
  },
  watch: {
    chosenLocation() {
      this.loadForecast();
    },
  },
  methods: {
    togglePopup() {
      this.showComingHoursPopup = !this.showComingHoursPopup;
    },
    async loadForecast() {
      try {
        await this.$store.dispatch("today/getWeather");

        const forecast = this.$store.getters["today/forecast"];
        const temps = this.$store.getters["today/highAndLow"];
        const timeseries = forecast.properties.timeseries;
        const today = new Date().getDate();

        const todaysForecast = [];

        timeseries.forEach((timeserie) => {
          if (new Date(timeserie.time).getDate() === today) {
            todaysForecast.push(timeserie);
          }
        });

        if (this.chosenLocation) {
          this.location = this.chosenLocation.location;
        }
        this.temp = Math.round(
          todaysForecast[0].data.instant.details.air_temperature
        );
        this.icon = todaysForecast[0].data.next_1_hours.summary.symbol_code;
        this.summary = this.$store.getters["today/summary"];
        this.low = temps.lowest;
        this.high = temps.highest;
        this.forecast = todaysForecast;
      } catch (e) {
        console.error(e);
      }
    },
  },
  async created() {
    this.loadForecast();
  }, */
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color-primary);
  color: var(--text-color-primary);
  padding: 0 3rem 2rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.flexContainer {
  display: flex;
  gap: 2rem;
}

.flex {
  display: flex;
}

.alignCenter {
  align-items: center;
}

h2 {
  font-size: 1rem;
  text-align: center;
}

h3 {
  font-size: 4rem;
  line-height: 1em;
  padding: 0;
  margin: 0;
}

.greyText {
  color: var(--grey-text-dark);
}

/* Coming hours slide-in animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

.slide-enter-to,
.slide-leave {
  transform: translateY(0);
}

/* Screen size adjustments */
@media only screen and (min-width: 1308px) {
  .buttonMain {
    display: none;
  }
}

@media screen and (max-height: 1000px), screen and (max-width: 1000px) {
  h2 {
    font-size: 0.8rem;
  }

  h3 {
    font-size: 2.6rem;
  }

  section {
    gap: 0.8rem;
  }
}

@media screen and (max-height: 660px), screen and (max-width: 600px) {
  h3 {
    font-size: 2rem;
  }

  section {
    gap: 0.5rem;
  }

  p {
    max-width: 10rem;
  }
}

@media screen and (max-width: 450px) {
  .container {
    padding: 0 0.5rem 1rem 0.5rem;
  }
}
</style>
