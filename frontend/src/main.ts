import "./assets/theme.css";
import "./assets/base.css";
import "./assets/navbar.css";
import "./assets/hero-section.css";
import "./assets/categories.css";
import "./assets/footer.css";
import "./assets/form.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
