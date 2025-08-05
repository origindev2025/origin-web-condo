<template>
  <div class="home">
    

    <!-- มือถือ -->
    <div class="d-block d-lg-none">
      <MobileNavbar />
      <BannerSlider />
    </div>

    <!-- Desktop -->
    <div class="d-none d-lg-block">
      <Navbar />
      <BannerGallery />
    </div>

    <!-- Search: แสดงทั้งมือถือและเดสก์ท็อป -->
    <Search />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MobileNavbar from "@/components/MobileNavbar.vue";
import BannerSlider from "@/components/BannerSlider.vue";
import BannerGallery from "@/components/BannerGallery.vue";
import Search from "@/components/Search.vue"; // 👈 นำเข้า Search

export default {
  name: "Home",
  components: {
    Navbar,
    MobileNavbar,
    BannerSlider,
    BannerGallery,
    Search // 👈 เพิ่มเข้า components
  },
};
</script>
