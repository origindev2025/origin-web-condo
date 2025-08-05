<template>
    <div>
        <nav class="mobile-navbar d-flex d-lg-none align-items-center py-2 px-3">
            <!-- Logo -->
            <a class="navbar-brand fw-bold" href="#">
                <img src="@/assets/logo.png" alt="Logo" height="30" />
            </a>

            <!-- Right Side: Toggle + Language -->
            <div class="d-flex align-items-center ms-auto">
                <!-- Language selector -->
                <div class="dropdown">
                    <button class="btn dropdown-toggle bg-transparent border-0 shadow-none" type="button" id="langDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img :src="getFlag($i18n.locale)" alt="Lang" width="24" class="rounded-circle me-1" />
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

                <!-- Menu toggle -->
                <button class="btn" @click="toggleMenu">
                    <i class="bi bi-list fs-4"></i>
                </button>
            </div>
        </nav>

        <!-- Slide-down menu -->
        <div v-if="isOpen" class="mobile-menu d-lg-none px-4 pb-3">
            <ul class="list-unstyled mt-4">
                <li v-for="item in navItems" :key="item.text" class="mb-3">
                    <a class="text-dark fw-medium" :href="item.link">
                        {{ $t(item.text) }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
  
  
<script>
export default {
    name: "MobileNavbar",
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
        toggleMenu() {
            this.isOpen = !this.isOpen;
            console.log("isOpen:", this.isOpen)
        },
        setLang(lang) {
            this.$i18n.locale = lang;
        },
        getFlag(lang) {
            return require(`@/assets/images/${lang}-flag.png`);
        },
    },
};
</script>
  
<style scoped>
.mobile-navbar {
    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1001;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.mobile-menu {
    background-color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}
.mobile-menu a {
  text-decoration: none;
  margin: 5px;
}
</style>
  