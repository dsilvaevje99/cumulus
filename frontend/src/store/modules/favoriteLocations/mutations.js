export default {
  setFavoriteList(state, payload) {
    state.locations = payload;
  },
  addFavorite(state, payload) {
    const newFavoritesList = [...state.locations, payload];
    state.locations = newFavoritesList;
  },
  deleteFavorite(state, payload) {
    const newFavoritesList = state.locations.filter((item) => item !== payload);
    state.locations = newFavoritesList;
  },
};
