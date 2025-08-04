<template>
  <div class="home">
    <Navbar />
    <!-- <BannerSlider /> -->
    <BannerGallery />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import BannerSlider from "@/components/BannerSlider.vue";
import BannerGallery from "@/components/BannerGallery.vue";


export default {
  name: "Home",
  components: {
    Navbar,
    // BannerSlider,
    BannerGallery
  },
};
</script>
<style scoped>
.cta-area {
  background-color: #f8f9fa;
}
</style>
