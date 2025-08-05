import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/style.scss";
import 'bootstrap-icons/font/bootstrap-icons.css'
import store from './store';

// ✅ ใช้ Swiper 4.x ที่ vue-awesome-swiper@3.1.3 รองรับ
import 'swiper/dist/css/swiper.min.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import VueI18n from "vue-i18n";
import th from "./lang/th";
import en from "./lang/en";
import cn from "./lang/cn";

Vue.use(VueI18n);
Vue.use(VueAwesomeSwiper);

const i18n = new VueI18n({
  locale: "th", // ค่าเริ่มต้น
  fallbackLocale: "en",
  messages: { th, en, cn },
});


router.beforeEach((to, from, next) => {
  const lang = to.params.lang;
  const supportedLangs = ["th", "en", "cn"];

  if (!supportedLangs.includes(lang)) {
    return next("/th");
  }

  if (i18n.locale !== lang) {
    i18n.locale = lang;
  }

  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
