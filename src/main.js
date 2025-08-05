import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/style.scss";
import 'bootstrap-icons/font/bootstrap-icons.css'

// ✅ ใช้ Swiper 4.x ที่ vue-awesome-swiper@3.1.3 รองรับ
import 'swiper/dist/css/swiper.min.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import VueI18n from "vue-i18n";
import th from "./lang/th";
import en from "./lang/en";

Vue.use(VueI18n);
Vue.use(VueAwesomeSwiper);

const i18n = new VueI18n({
  locale: "th",
  fallbackLocale: "en",
  messages: { th, en },
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
