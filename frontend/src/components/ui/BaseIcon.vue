<template>
  <img :src="iconPath" :alt="iconAlt" :class="iconSize" />
</template>

<script>
import menuIcon from "../../assets/icons/menu_white_24dp.svg";
import closeIcon from "../../assets/icons/close_white_24dp.svg";
import deleteIcon from "../../assets/icons/delete_white_24dp.svg";
import addIcon from "../../assets/icons/add_white_24dp.svg";
import cloudIcon from "../../assets/icons/cloud_white_24dp.svg";
import moonIcon from "../../assets/icons/dark_mode_white_24dp.svg";
import calendarIcon from "../../assets/icons/date_range_white_24dp.svg";
import penIcon from "../../assets/icons/edit_white_24dp.svg";
import heartIcon from "../../assets/icons/favorite_border_white_24dp.svg";
import sunIcon from "../../assets/icons/light_mode_white_24dp.svg";
import locationMarker from "../../assets/icons/place_white_24dp.svg";
import clockIcon from "../../assets/icons/schedule_white_24dp.svg";
import searchIcon from "../../assets/icons/search_white_24dp.svg";
import umbrellaIcon from "../../assets/icons/umbrella_white_24dp.svg";
import fogIcon from "../../assets/icons/fog_white.svg";
import lightRainIcon from "../../assets/icons/light_rain_white.svg";
import heavyRainIcon from "../../assets/icons/heavy_rain_white.svg";
import lightSleetIcon from "../../assets/icons/light_sleet_white.svg";
import sleetIcon from "../../assets/icons/sleet_white.svg";
import heavySleetIcon from "../../assets/icons/heavy_sleet_white.svg";
import lightSnowIcon from "../../assets/icons/light_snow_white.svg";
import snowIcon from "../../assets/icons/snow_white.svg";
import heavySnowIcon from "../../assets/icons/heavy_snow_white.svg";
import moonHalfSun from "../../assets/icons/clearsky_polartwilight_white.svg";

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: "medium",
    },
  },
  computed: {
    iconPath() {
      return this.icon === "menu"
        ? menuIcon
        : this.icon === "add"
        ? addIcon
        : this.icon === "cloud" ||
          this.icon === "cloudy" ||
          this.icon === "partlycloudy_day" ||
          this.icon === "partlycloudy_polartwilight"
        ? cloudIcon
        : this.icon === "moon" ||
          this.icon === "fair_night" ||
          this.icon === "partlycloudy_night" ||
          this.icon === "clearsky_night"
        ? moonIcon
        : this.icon === "calendar"
        ? calendarIcon
        : this.icon === "pen"
        ? penIcon
        : this.icon === "heart"
        ? heartIcon
        : this.icon === "sun" ||
          this.icon === "clearsky_day" ||
          this.icon === "fair_day"
        ? sunIcon
        : this.icon === "clearsky_polartwilight" ||
          this.icon === "fair_polartwilight"
        ? moonHalfSun
        : this.icon === "location"
        ? locationMarker
        : this.icon === "clock"
        ? clockIcon
        : this.icon === "search"
        ? searchIcon
        : this.icon === "umbrella"
        ? umbrellaIcon
        : this.icon === "rainshowers_day" ||
          this.icon === "rainshowers_night" ||
          this.icon === "lightrainshowers_day" ||
          this.icon === "lightrainshowers_night" ||
          this.icon === "heavyrainshowers_day" ||
          this.icon === "heavyrainshowers_night" ||
          this.icon === "rain" ||
          this.icon === "lightrain"
        ? lightRainIcon
        : this.icon === "heavyrain"
        ? heavyRainIcon
        : this.icon === "fog"
        ? fogIcon
        : this.icon === "delete"
        ? deleteIcon
        : this.icon === "lightsleet" ||
          this.icon === "lightsleetshowers_day" ||
          this.icon === "lightsleetshowers_night"
        ? lightSleetIcon
        : this.icon === "sleet"
        ? sleetIcon
        : this.icon === "heavysleet"
        ? heavySleetIcon
        : this.icon === "lightsnow"
        ? lightSnowIcon
        : this.icon === "snow"
        ? snowIcon
        : this.icon === "heavysnow"
        ? heavySnowIcon
        : this.icon === "close"
        ? closeIcon
        : "";
    },
    iconAlt() {
      return this.icon;
    },
    iconSize() {
      return this.size || "";
    },
  },
};
</script>

<style scoped>
img {
  margin: 0 0.5em -0.2em 0;
  filter: var(--icon-color-primary);
}

.xl {
  width: 13em;
  margin: 0;
}

.big {
  margin: 0 0 0 0.1em;
  transform: translateY(-0.2em);
  width: 3em;
  filter: var(--logo-color-filter);
}

.medium {
  width: 1.3em;
}

.small {
  margin: 0 0.3em -0.1em 0;
  width: 1em;
}

@media screen and (max-height: 700px), screen and (max-width: 650px) {
  .xl {
    width: 8rem;
  }
}

@media screen and (max-height: 660px), screen and (max-width: 600px) {
  .xl {
    width: 6rem;
  }
}
</style>
