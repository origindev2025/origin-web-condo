<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary py-2">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand fw-bold ms-4" href="#">
        <img src="../assets/logo.png" alt="Logo" height="40" class="me-6" />
      </a>

      <!-- Toggler for mobile -->
      <button class="navbar-toggler" type="button" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar items -->
      <div class="collapse navbar-collapse" :class="{ show: isOpen }">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
          <li class="nav-item me-4" v-for="item in navItems" :key="item.text">
            <a class="nav-link text-white" :href="item.link">{{ $t(item.text) }}</a>
          </li>
        </ul>

        <!-- Language selector -->
        <div class="dropdown me-3 language-dropdown">
          <button class="btn dropdown-toggle d-flex align-items-center bg-transparent border-0 shadow-none" type="button"
            id="langDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="getFlag($i18n.locale)" alt="Lang" width="24" class="rounded-circle me-2" />
            <!-- {{ $i18n.locale.toUpperCase() }} -->
          </button>
          <ul class="dropdown-menu" aria-labelledby="langDropdown">
            <li>
              <a class="dropdown-item d-flex align-items-center" @click="setLang('th')">
                <img src="@/assets/images/th-flag.png" width="24" class="rounded-circle me-2" /> TH
              </a>
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center" @click="setLang('en')">
                <img src="@/assets/images/en-flag.png" width="24" class="rounded-circle me-2" /> EN
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
      navItems: [
        { text: "navbar.condo", link: "#" },
        { text: "navbar.about", link: "#" },
        { text: "navbar.investor", link: "#" },
        { text: "navbar.sustain", link: "#" },
        { text: "navbar.promotion", link: "#" },
      ],
    };
  },
  methods: {
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

<style scoped>
body {
  font-family: 'Kadiee', sans-serif;
}

.navbar {
  background-color: transparent;
}

.navbar-toggler {
  border: none;
}

img.active {
  border: 2px solid #fff;
  border-radius: 50%;
}

.flag-icon {
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
}

.language-dropdown {
  position: relative;
}

.language-dropdown .dropdown-menu {
  min-width: 100%;
  /* width: 100%; */
}
.language-dropdown .btn {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
</style>
