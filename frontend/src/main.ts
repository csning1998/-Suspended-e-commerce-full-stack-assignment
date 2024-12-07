// src/main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import AppComponent from "./App.vue";
import router from "./router";

import "./assets/theme.css";
import "./assets/base.css";
import "./assets/navbar.css";
import "./assets/hero-section.css";
import "./assets/categories.css";
import "./assets/footer.css";
import "./assets/form.css";
import "./assets/button.css";
import "vue-final-modal/style.css";

// Import Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
});

// Import FontAwesome Icon Component
import FontAwesomeIcon from "./components/common/FortAwesomeIcon";

const app = createApp(AppComponent);

// Register global plugins
app.use(createPinia());
app.use(router);
app.use(vuetify);

// Register FontAwesomeIcon globally
app.component("fa", FontAwesomeIcon);

app.mount("#app");
