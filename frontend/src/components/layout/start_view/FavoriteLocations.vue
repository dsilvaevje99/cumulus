<template>
  <div>
    <div className="flexContainer topOfContextStack">
      <h3>
        <base-icon icon="heart"></base-icon>
        Favoritter
      </h3>
      <search-bar
        :placeholder="placeholder"
        type="favoriteLocations"
        @picked-location="addFavorite"
      ></search-bar>
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
</template>

<script>
import SearchBar from "../SearchBar.vue";

export default {
  components: { SearchBar },
  data() {
    return {
      placeholder: "+ Legg til ny",
    };
  },
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
    },
    deleteFavorite(favorite) {
      this.$store.dispatch("favorite/deleteFavorite", favorite);
    },
  },
};
</script>

<style scoped>
.topOfContextStack {
  z-index: 10;
}

.flexContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scrollBox {
  height: 10rem;
  overflow-y: overlay;
}

button {
  color: var(--text-color-primary);
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  margin-bottom: 0.3rem;
  display: block;
  cursor: pointer;
  transition: 0.2s all ease-out;
}

button:hover {
  color: var(--cumulus-green);
}

input {
  padding: 0.5rem 1rem;
  width: 15rem;
  border: none;
  background-color: var(--bg-color-tertiary);
  color: var(--text-color-primary);
  transition: 0.2s all ease-out;
  font-size: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  text-align: right;
}

input:hover::placeholder {
  transition: 0.2s color ease-out;
  color: var(--text-color-primary);
  opacity: 1;
}

input:focus {
  outline: none;
  background-color: var(--bg-color-secondary);
  cursor: text;
  text-align: left;
}

input:focus::placeholder {
  color: var(--grey-text-light);
}

.deleteButton {
  opacity: 0.25;
  margin: 0 0.5rem;
}

.deleteButton:hover {
  opacity: 1;
}

/* Style changes for tab-info-area */
@media only screen and (max-width: 1250px) {
  h3 {
    display: none;
  }

  .scrollBox {
    height: 6.9rem;
  }

  input {
    text-align: left;
    padding-left: 0;
    margin-bottom: 1rem;
  }

  input:focus {
    padding-left: 1rem;
  }
}

@media only screen and (max-height: 700px) {
  .scrollBox {
    height: 5.45rem;
  }

  input {
    margin-bottom: 0;
  }
}

@media only screen and (max-height: 660px) {
  .scrollBox {
    height: 2.95rem;
  }
}
</style>
