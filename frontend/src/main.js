import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

import BaseIcon from "./components/ui/BaseIcon.vue";
import LoadingSpinner from "./components/ui/LoadingSpinner.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-icon", BaseIcon);
app.component("loading-spinner", LoadingSpinner);

app.mount("#app");
