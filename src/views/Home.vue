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

    <!-- ค้นหาโครงการที่ใช่ ทำเลดี -->
    <Search />

    <Recommend />

    <router-link to="/th/project/ready">ทดสอบลิงก์</router-link>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MobileNavbar from "@/components/MobileNavbar.vue";
import BannerSlider from "@/components/BannerSlider.vue";
import BannerGallery from "@/components/BannerGallery.vue";
import Search from "@/components/Search.vue";
import Recommend from "@/components/Recommend.vue";


export default {
  name: "Home",
  components: {
    Navbar,
    MobileNavbar,
    BannerSlider,
    BannerGallery,
    Search,
    Recommend
  },
};
</script>
