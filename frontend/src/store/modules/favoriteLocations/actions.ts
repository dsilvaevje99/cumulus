export default {
  setFavoriteList(context: any, payload: any) {
    context.commit("setFavoriteList", payload);
  },
  addFavorite(context: any, payload: any) {
    if (localStorage.getItem("favoriteList") === null) {
      localStorage.setItem("favoriteList", JSON.stringify([payload]));
    } else {
      const savedList = JSON.parse(localStorage.favoriteList);
      const newList = [...savedList, payload];
      localStorage.setItem("favoriteList", JSON.stringify(newList));
    }

    context.commit("addFavorite", payload);
  },
  deleteFavorite(context: any, payload: any) {
    const savedList = JSON.parse(localStorage.favoriteList);
    savedList.splice(
      savedList.findIndex((item: any) => item.location === payload.location),
      1
    );
    localStorage.setItem("favoriteList", JSON.stringify(savedList));

    context.commit("deleteFavorite", payload);
  },
};
