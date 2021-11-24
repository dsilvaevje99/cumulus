<template>
  <div class="dropdownContainer">
    <base-icon icon="heart" class="icon"></base-icon>
    <div class="favoriteContainer" @mouseenter="handleEventListeners">
      <div>
        <div className="flexContainer" id="favoriteGoogleContainer">
          <h3>
            <base-icon icon="heart" style="filter: brightness(0%)"></base-icon>
            Favoritter
          </h3>
          <search-bar
            placeholder="+ Legg til ny"
            type="favoriteLocationsPopup"
            @picked-location="addFavorite"
          ></search-bar>
        </div>
      </div>
      <div class="scrollBox">
        <p v-if="locations.length === 0">Du har ingen favoritter enda.</p>
        <div
          v-else
          v-for="item in locations"
          :key="item.location"
          className="flexContainer"
        >
          <button @click="pickLocation(item)">
            {{ item.location }}
          </button>
          <button @click="deleteFavorite(item)" className="deleteButton">
            <base-icon icon="delete" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "../SearchBar.vue";

export default {
  components: { SearchBar },
  computed: {
    locations() {
      const locations = this.$store.getters["favorite/locations"];
      if (locations) {
        return locations.sort((a, b) =>
          a.location > b.location ? 1 : b.location > a.location ? -1 : 0
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    pickLocation(favorite) {
      this.$store.dispatch("today/setLocation", { ...favorite });
    },
    addFavorite(item) {
      if (item) {
        const location = `${item.city}${
          item.country !== "Norway" ? `, ${item.country}` : ""
        }`;
        this.$store.dispatch("favorite/addFavorite", {
          lat: item.lat,
          lon: item.lng,
          location,
        });
      }

      //Remove class added by event listener
      const favoritePopup = document.getElementsByClassName(
        "favoriteContainer"
      )[0];
      favoritePopup.classList.remove("displayFavoritePopup");
    },
    deleteFavorite(favorite) {
      this.$store.dispatch("favorite/deleteFavorite", favorite);
    },
    handleEventListeners() {
      //Add hover event listener to google place result dropdown
      //to prevent the popup from closing when hovering over results.

      const placeResultPopups = document.getElementsByClassName(
        "place-result-popup-container"
      );
      const favoritePopup = document.getElementsByClassName(
        "favoriteContainer"
      )[0];

      function addClass(e) {
        //Only react to popup inside favorites popup
        if (e.fromElement.id === "addFavoriteDropdown") {
          favoritePopup.classList.add("displayFavoritePopup");
        }
      }
      function removeClass() {
        favoritePopup.classList.remove("displayFavoritePopup");
        cleanupEventListeners();
      }
      function cleanupEventListeners() {
        placeResultPopups.forEach((item) => {
          item.removeEventListener("mouseenter", addClass, false);
          item.removeEventListener("mouseleave", removeClass, false);
        });
      }

      placeResultPopups.forEach((item) => {
        item.addEventListener("mouseenter", addClass, false);
        item.addEventListener("mouseleave", removeClass, false);
      });
    },
  },
};
</script>

<style scoped>
.dropdownContainer {
  position: relative;
  margin-right: 2rem;
}

.dropdownContainer:hover > .icon {
  filter: var(--logo-color-filter);
}

.icon {
  font-size: 1.3em;
  margin: 0;
}

.favoriteContainer {
  background-color: var(--cumulus-green);
  color: var(--text-color-secondary);
  opacity: 0;
  position: absolute;
  top: 100%;
  right: 0;
  transition: 0.5s opacity ease-out;
  height: 0;
  width: 0;
  border-radius: 1rem;
  z-index: 10;
}

.favoriteContainer > div {
  display: none;
}

.dropdownContainer:hover > .favoriteContainer,
.displayFavoritePopup {
  opacity: 1;
  padding: 1rem 2rem 2rem 2rem;
  height: auto;
  width: 30rem;
}

.dropdownContainer:hover > .favoriteContainer > div,
.displayFavoritePopup > div {
  display: initial;
}

.flexContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scrollBox {
  max-height: 30rem;
  overflow-y: overlay;
}

button {
  color: var(--text-color-secondary);
  opacity: 0.5;
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  margin-bottom: 0.3rem;
  display: block;
  cursor: pointer;
  transition: 0.2s all ease-out;
  max-width: 20rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

button:hover {
  opacity: 1;
}

.deleteButton {
  filter: var(--icon-color-secondary);
  opacity: 0.25;
  margin: 0 0.5rem;
}

.deleteButton:hover {
  opacity: 1;
}

@media only screen and (max-width: 1000px) {
  .dropdownContainer {
    margin-right: 1rem;
  }
}

@media only screen and (max-width: 850px) {
  .dropdownContainer:hover > .favoriteContainer,
  .displayFavoritePopup {
    padding: 0.5rem 1rem 1rem 1rem;
    width: 20rem;
  }

  .favoriteContainer {
    right: -9rem;
  }

  #favoriteGoogleContainer {
    flex-direction: column;
  }

  h3 {
    margin: 0.3rem 0 0.5rem 0;
  }

  input {
    width: 100%;
  }

  button {
    max-width: 14rem;
  }
}

@media only screen and (max-width: 600px) {
  .favoriteContainer {
    left: 0;
    right: unset;
  }
}
</style>
