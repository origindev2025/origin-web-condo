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
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MobileNavbar from "@/components/MobileNavbar.vue";
import BannerSlider from "@/components/BannerSlider.vue";
import BannerGallery from "@/components/BannerGallery.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    MobileNavbar,
    BannerSlider,
    BannerGallery
  },
};
</script>

<style scoped>
.cta-area {
  background-color: #f8f9fa;
}
</style>
