export default {
  setFavoriteList(state: any, payload: any) {
    state.locations = payload;
  },
  addFavorite(state: any, payload: any) {
    const newFavoritesList = [...state.locations, payload];
    state.locations = newFavoritesList;
  },
  deleteFavorite(state: any, payload: any) {
    const newFavoritesList = state.locations.filter(
      (item: any) => item !== payload
    );
    state.locations = newFavoritesList;
  },
};
