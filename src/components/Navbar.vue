<template>
  <nav class="navbar navbar-expand-lg py-2" :class="[isScrolled ? 'scrolled' : 'transparent']">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand fw-bold ms-4" href="#">
        <img src="../assets/logo.png" alt="Logo" height="40" class="me-6" />
      </a>

      <!-- Toggler for mobile -->
      <button class="navbar-toggler" type="button" @click="toggleNavbar">
        <span class="navbar-toggler-icon" :style="{ filter: isScrolled ? 'invert(0)' : 'invert(1)' }"></span>
      </button>

      <!-- Navbar items -->
      <div class="collapse navbar-collapse" :class="{ show: isOpen }">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
          <li class="nav-item me-4" v-for="item in navItems" :key="item.text">
            <a class="nav-link" :class="{ 'text-white': !isScrolled, 'text-dark': isScrolled }" :href="item.link">
              {{ $t(item.text) }}
            </a>
          </li>
        </ul>

        <!-- Language selector -->
        <div class="dropdown me-3 language-dropdown">
          <button class="btn dropdown-toggle d-flex align-items-center bg-transparent border-0 shadow-none" type="button"
            id="langDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="getFlag($i18n.locale)" alt="Lang" width="28" class="rounded-circle me-2" />
          </button>
          <ul class="dropdown-menu" aria-labelledby="langDropdown">
            <li>
              <a class="dropdown-item d-flex align-items-center" @click="setLang('th')">
                <img src="@/assets/images/th-flag.png" width="28" class="rounded-circle me-2" /> TH
              </a>
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center" @click="setLang('en')">
                <img src="@/assets/images/en-flag.png" width="28" class="rounded-circle me-2" /> EN
              </a>
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center" @click="setLang('cn')">
                <img src="@/assets/images/cn-flag.png" width="28" class="rounded-circle me-2" /> CN
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: "Navbar",
  data() {
    return {
      isOpen: false,
      isScrolled: false,
      navItems: [
        { text: "navbar.condo", link: "#" },
        { text: "navbar.about", link: "#" },
        { text: "navbar.investor", link: "#" },
        { text: "navbar.sustain", link: "#" },
        { text: "navbar.promotion", link: "#" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    setNavbarHeight() {
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar?.getBoundingClientRect().height || 66;

      console.log("🔍 Navbar height:", navbarHeight); // ← ตรวจดูว่าค่าถูกต้องไหม
      console.log("📦 Setting padding-top to .page-wrapper");

      if (this.$refs.pageWrapper) {
        this.$refs.pageWrapper.style.paddingTop = `${navbarHeight}px`;
      } else {
        console.warn("⚠️ .page-wrapper not found");
      }
    },
    handleScroll() {
      console.log(window.scrollY)
      this.isScrolled = window.scrollY > 20;
    },
    setLang(lang) {
      this.$i18n.locale = lang;
    },
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
    getFlag(lang) {
      return require(`@/assets/images/${lang}-flag.png`);
    },
  },
};
</script>


<style >
nav.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* ยังไม่ scroll */
nav.navbar.transparent {
  background-color: transparent !important;
  box-shadow: none !important;
}

/* scroll แล้ว */
nav.navbar.scrolled {
  background-color: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.navbar-toggler {
  padding: var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);
  font-size: var(--bs-navbar-toggler-font-size);
  line-height: 1;
  color: var(--bs-navbar-color);
  background-color: #ffffff;
  border: var(--bs-border-width) solid rgb(244 243 243 / 0%);
  border-radius: var(--bs-navbar-toggler-border-radius);
  transition: var(--bs-navbar-toggler-transition);
}

.language-dropdown .dropdown-item {
  cursor: pointer;
}
</style>

