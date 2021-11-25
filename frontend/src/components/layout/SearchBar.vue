<template>
  <div class="inputContainer">
    <input
      type="text"
      v-model="searchQuery"
      :placeholder="placeholderText"
      @blur="
        togglePlaceholder('blur');
        clearInputField(100);
      "
      @focus="togglePlaceholder('focus')"
      :class="{
        favLocStyles: type === 'favoriteLocations',
        favLocPopupStyles: type === 'favoriteLocationsPopup',
        squareBottomCorners: results !== null || awaitingSearch,
      }"
    />
    <base-icon
      icon="location"
      class="icon"
      v-if="type !== 'favoriteLocations' && type !== 'favoriteLocationsPopup'"
    ></base-icon>
    <div class="resultsContainer place-result-popup-container" v-if="showPopup">
      <div
        class="resultItem"
        v-for="result in results"
        :key="result._id"
        @click="
          $emit('picked-location', result);
          clearInputField(0);
        "
      >
        {{ result.city }}<span class="greyText">, {{ result.country }}</span>
      </div>
      <div v-if="awaitingSearch" class="loadingSpinnerContainer">
        <loading-spinner></loading-spinner>
      </div>
      <div v-if="gotResults === false" class="noResults">
        Fant ingen resultater...
      </div>
    </div>
  </div>
</template>

<script>
import { searchForCity } from "../../db/mongo-express-script";

export default {
  props: ["placeholder", "type"],
  data() {
    return {
      searchQuery: "",
      awaitingSearch: false,
      results: null,
      placeholderText: this.placeholder,
    };
  },
  computed: {
    showPopup() {
      return Array.isArray(this.results) || this.awaitingSearch;
    },
    gotResults() {
      if (this.results !== null && !this.awaitingSearch) {
        if (this.results.length === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return "";
      }
    },
  },
  watch: {
    searchQuery(newVal) {
      if (newVal.trim() === "") {
        this.results = null;
        this.awaitingSearch = false;
        return;
      }

      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.fetchResults(this.searchQuery.trim());
          this.awaitingSearch = false;
        }, 1000); // 1 sec delay
      }
      this.awaitingSearch = true;
    },
  },
  methods: {
    async fetchResults(searchQuery) {
      if (searchQuery === "") {
        this.clearInputField();
        return;
      }
      let res = await searchForCity(searchQuery);
      this.results = res.data;
    },
    clearInputField(timer) {
      // @blur event needs timeout to give $emit time to send value to parent
      setTimeout(() => {
        this.results = null;
        this.searchQuery = "";
      }, timer);
    },
    togglePlaceholder(event) {
      if (
        this.type === "favoriteLocations" ||
        this.type === "favoriteLocationsPopup"
      ) {
        if (event === "focus") {
          this.placeholderText = "Søk...";
        } else {
          this.placeholderText = "+ Legg til ny";
        }
      }
    },
  },
};
</script>

<style scoped>
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
  transition: background-color 0.2s ease-out, border-radius 0.2s ease-out;
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

.favLocStyles {
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

.favLocStyles:hover::placeholder {
  transition: 0.2s color ease-out;
  color: var(--text-color-primary);
  opacity: 1;
}

.favLocStyles:focus {
  outline: none;
  background-color: var(--bg-color-secondary);
  cursor: text;
  text-align: left;
  color: var(--text-color-primary);
}

.favLocStyles:focus::placeholder {
  color: var(--grey-text-light);
}

.favLocPopupStyles {
  padding: 0.5rem 1rem;
  width: 15rem;
  border: none;
  background-color: var(--cumulus-green);
  color: var(--text-color-secondary);
  transition: 0.2s all ease-out;
  font-size: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  text-align: right;
}

.favLocPopupStyles:hover::placeholder {
  transition: 0.2s color ease-out;
  color: var(--text-color-secondary);
  opacity: 1;
}

.favLocPopupStyles:focus {
  outline: none;
  background-color: #55d87a;
  cursor: text;
  text-align: left;
}

.favLocPopupStyles:focus::placeholder {
  color: rgb(43, 43, 43);
}

.squareBottomCorners {
  border-radius: 1rem 1rem 0 0;
}

.resultsContainer {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-color-secondary);
  color: var(--text-color-primary);
  padding: 0.5rem 0;
  z-index: 100;
  border-radius: 0 0 1rem 1rem;
}

.resultsContainer:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

.noResults {
  padding: 0.5rem 1rem;
  color: var(--grey-text-light);
}

.resultItem {
  width: 100%;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.resultItem:hover {
  background-color: var(--bg-color-tertiary);
}

.greyText {
  color: var(--grey-text-light);
}
</style>
