<template>
  <div class="container">
    <div class="tabsContainer">
      <div
        :class="'tab ' + isSelected('comingDays')"
        @click="setSelected('comingDays')"
      >
        <base-icon icon="calendar"></base-icon>
        <span class="tabLabelText">Dagene fremover</span>
      </div>
      <div
        :class="'tab ' + isSelected('favorites')"
        @click="setSelected('favorites')"
      >
        <base-icon icon="heart"></base-icon>
        <span class="tabLabelText">Favoritter</span>
      </div>
    </div>
    <div class="infoContainer">
      <div v-if="selected === 'comingDays'">
        <coming-days></coming-days>
      </div>
      <div v-else>
        <favorite-locations></favorite-locations>
      </div>
    </div>
  </div>
</template>

<script>
import ComingDays from "../start_view/ComingDays.vue";
import FavoriteLocations from "../start_view/FavoriteLocations.vue";

export default {
  components: { ComingDays, FavoriteLocations },
  data() {
    return {
      selected: "comingDays",
    };
  },
  methods: {
    setSelected(item) {
      this.selected = item;
    },
    isSelected(item) {
      return this.selected === item ? "active" : "";
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: var(--text-color-primary);
}

.tabsContainer {
  display: flex;
  margin-left: 1rem;
}

.tab {
  padding: 1em 2em;
  cursor: pointer;
  opacity: 0.5;
  border-radius: 0.5em 0.5em 0 0;
  transition: 0.25s all ease-out;
}

.tab:hover {
  background-color: var(--bg-color-secondary);
  opacity: 1;
}

.active,
.active:hover {
  background-color: var(--bg-color-tertiary);
  font-weight: bold;
  opacity: 1;
}

.infoContainer {
  background-color: var(--bg-color-tertiary);
  padding: 1em 3rem;
  width: 100%;
}

@media only screen and (min-width: 1308px) {
  .container {
    display: none;
  }
}

@media only screen and (max-width: 660px) {
  .infoContainer {
    padding: 0.8em 2rem;
  }
}

@media only screen and (max-width: 450px) {
  .infoContainer {
    padding: 0.5rem;
  }

  .tabsContainer {
    margin-left: 0rem;
  }

  .tab img {
    font-size: 1.2em;
    margin: 0;
  }

  .tabLabelText {
    display: none;
  }
}

@media only screen and (max-height: 700px) {
  .tabsContainer {
    margin-left: 1.5rem;
  }

  .tab {
    padding: 0.8em 1.6em;
    border-radius: 0.4em 0.4em 0 0;
  }
}

@media only screen and (max-height: 660px) {
  .tabsContainer {
    margin-left: 2rem;
  }

  .tab {
    padding: 0.5em 1em;
    border-radius: 0.25em 0.25em 0 0;
  }
}
</style>
