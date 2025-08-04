<template>
    <div class="banner-container">
      <swiper :options="swiperOptions" ref="swiper">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="image-area">
            <img :src="slide.image" class="main-image" />
          </div>
        </swiper-slide>
  
        <!-- Navigation -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
  
        <!-- Pagination -->
        <div class="swiper-pagination"></div>
      </swiper>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        slides: [
          {
            image: require("@/assets/images/pet-banner1.jpg"),
          },
          {
            image: require("@/assets/images/pet-banner2.jpg"),
          },
          {
            image: require("@/assets/images/pet-banner3.jpg"),
          },
        ],
        swiperOptions: {
          loop: true,
          autoplay: { delay: 4000 },
          pagination: { el: ".swiper-pagination", clickable: true },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
        }
      };
    },
  };
  </script>
  
  <style scoped>
  .banner-container {
    background: #0e63c6;
    padding: 0;
  }
  .image-area {
    width: 100%;
  }
  .main-image {
    width: 100%;
    height: auto;
    display: block;
  }
  </style>
  