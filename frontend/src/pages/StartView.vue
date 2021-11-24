<template>
  <div class="flexContainer">
    <div class="left">
      <tool-bar></tool-bar>
      <weather-now></weather-now>
      <info-area></info-area>
      <tab-info-area></tab-info-area>
    </div>
    <div class="right">
      <coming-hours></coming-hours>
    </div>
  </div>
</template>

<script>
import ToolBar from "../components/layout/ToolBar.vue";
import WeatherNow from "../components/layout/start_view/WeatherNow.vue";
import ComingHours from "../components/layout/start_view/ComingHours.vue";
import InfoArea from "../components/layout/start_view/InfoArea.vue";
import TabInfoArea from "../components/layout/mobile_alternatives/TabInfoArea.vue";

export default {
  components: {
    ToolBar,
    WeatherNow,
    ComingHours,
    InfoArea,
    TabInfoArea,
  },
};
</script>

<style scoped>
.flexContainer {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.left {
  display: flex;
  flex-direction: column;
  flex: 4;
}

.right {
  flex: 1;
}

@media only screen and (max-width: 1308px) {
  .right {
    display: none;
  }
}

@media only screen and (max-width: 530px) {
  .left {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
