import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'aos/dist/aos.css';
import AOS from 'aos';
import App from './App.vue';
import router from './router';


import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
AOS.init();

app.use(createPinia());


app.use(router);


app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeButton: "button",
  draggable: true,
});

app.mount('#app');
