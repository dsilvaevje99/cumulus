<template>
  <div class="toolBarContainer">
    <header>
      <div>
        <a href="/" class="logoLink">
          <h1>Cumulus</h1>
          <base-icon icon="cloud" size="big"></base-icon>
        </a>
      </div>
      <div class="actions">
        <router-link to="/"
          ><img
            src="../../assets/icons/standard_view_white.svg"
            alt="Standard view"
            :class="`viewIcon ${currentRouteName === '/' && 'active'}`"
        /></router-link>
        <router-link to="/dagene-framover"
          ><img
            src="../../assets/icons/day_view_white.svg"
            alt="Day view"
            :class="
              `viewIcon ${currentRouteName === '/dagene-framover' && 'active'}`
            "
        /></router-link>
        <theme-toggler></theme-toggler>
      </div>
      <div class="mainSearchbarContainer">
        <div
          v-if="currentRouteName === '/dagene-framover'"
          class="favoritePopupContainer"
        >
          <favorite-dropdown></favorite-dropdown>
        </div>
        <div class="inputContainer">
          <search-bar
            placeholder="Søk..."
            @picked-location="pickLocation"
          ></search-bar>
        </div>
      </div>
      <div class="actionsPopupContainer">
        <actions-dropdown></actions-dropdown>
      </div>
    </header>
    <div class="mobilePlaceContainer">
      <div
        v-if="currentRouteName === '/dagene-framover'"
        class="favoritePopupContainer"
      >
        <favorite-dropdown></favorite-dropdown>
      </div>
      <div class="inputContainer">
        <search-bar
          placeholder="Søk..."
          @picked-location="pickLocation"
        ></search-bar>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteDropdown from "./days_view/FavoriteDropdown.vue";
import ActionsDropdown from "./mobile_alternatives/ActionsDropdown.vue";
import SearchBar from "./SearchBar.vue";
import ThemeToggler from "./ThemeToggler.vue";

export default {
  components: {
    ThemeToggler,
    FavoriteDropdown,
    ActionsDropdown,
    SearchBar,
  },
  computed: {
    currentRouteName() {
      return this.$router.currentRoute._value.fullPath;
    },
  },
  methods: {
    pickLocation(item) {
      if (item) {
        const location = `${item.city}${
          item.country !== "Norway" ? `, ${item.country}` : ""
        }`;
        this.$store.dispatch("today/setLocation", {
          lat: item.lat,
          lon: item.lng,
          location,
        });
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap");

.toolBarContainer {
  width: 100%;
  background-color: var(--bg-color-primary);
  color: var(--text-color-primary);
  padding: 2em 3rem;
  display: flex;
  flex-direction: column;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  z-index: 10;
}

.mobilePlaceContainer {
  width: 100%;
  display: flex;
  align-items: center;
}

div {
  width: max-content;
  display: flex;
  align-items: center;
  position: relative;
}

.logoLink {
  text-decoration: none;
  display: flex;
  align-items: center;
}

h1 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 2rem;
  line-height: 1em;
  color: var(--cumulus-green);
}

.actions * {
  margin: 0 1em;
}

.inputContainer {
  position: relative;
  height: max-content;
}

input {
  padding: 0.5rem 1rem 0.5rem 2rem;
  font-size: 1rem;
  width: 15rem;
  border-radius: 1rem;
  border: none;
  background-color: var(--bg-color-secondary);
  color: var(--text-color-primary);
  transition: 0.2s background-color ease-out;
}

input:focus {
  outline: none;
  background-color: white;
  color: black;
}

.icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.viewIcon {
  width: 2rem;
  opacity: 0.25;
  transition: 0.2s opacity ease-out;
  margin: 0;
  filter: var(--icon-color-primary);
}

.viewIcon:hover {
  opacity: 1;
}

.active {
  opacity: 1;
}

.actionsPopupContainer {
  display: none;
  align-self: center;
}

@media only screen and (max-width: 1000px) {
  input {
    width: 13rem;
  }
}

@media only screen and (max-width: 850px) {
  .actions {
    display: none;
  }

  .actionsPopupContainer {
    display: initial;
  }
}

@media only screen and (max-width: 660px) {
  .toolBarContainer {
    padding: 1.5em 2rem;
  }
}

@media only screen and (max-width: 600px) {
  h1 {
    display: none;
  }
}

@media only screen and (min-width: 451px) {
  .mobilePlaceContainer {
    display: none;
  }
}

@media only screen and (max-width: 450px) {
  .toolBarContainer {
    padding: 1em 1.5rem;
  }

  input {
    width: 15rem;
  }

  .mainSearchbarContainer {
    display: none;
  }

  h1 {
    display: initial;
    font-size: 2em;
  }

  header > :nth-child(1) {
    font-size: 0.7em;
  }
}

@media only screen and (max-width: 330px) {
  input {
    width: 100%;
  }
}
</style>
