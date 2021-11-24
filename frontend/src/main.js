import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

import BaseIcon from "./components/ui/BaseIcon.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-icon", BaseIcon);

app.mount("#app");
