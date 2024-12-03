import "./assets/theme.css";
import "./assets/base.css";
import "./assets/navbar.css";
import "./assets/hero-section.css";
import "./assets/categories.css";
import "./assets/footer.css";
import "./assets/form.css";
import 'vue-final-modal/style.css'

import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createVfm } from 'vue-final-modal'


import AppComponent from "./App.vue";
import router from "./router";

const app = createApp(AppComponent).component("fa", FontAwesomeIcon);
const vfm = createVfm()

library.add(fas);
app.use(createPinia());
app.use(router);
app.use(vfm)

app.mount('#app')
