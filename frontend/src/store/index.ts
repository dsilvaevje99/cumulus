import { createStore } from "vuex";

import favoriteModule from "./modules/favoriteLocations/index";
import futureModule from "./modules/weatherFuture/index";
import todayModule from "./modules/weatherToday/index";

const store = createStore({
  modules: {
    favorite: favoriteModule,
    future: futureModule,
    today: todayModule,
  },
});

export default store;
