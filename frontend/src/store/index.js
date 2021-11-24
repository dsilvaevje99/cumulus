import { createStore } from "vuex";

import favoriteModule from "./modules/favoriteLocations/index.js";
import futureModule from "./modules/weatherFuture/index.js";
import todayModule from "./modules/weatherToday/index.js";

const store = createStore({
  modules: {
    favorite: favoriteModule,
    future: futureModule,
    today: todayModule,
  },
});

export default store;
