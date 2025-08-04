<template>
    <div class="main-banner-wrapper">
        <swiper :options="mainSwiperOptions" ref="mainSwiper" @ready="onMainSwiperReady">
            <swiper-slide v-for="(slide, i) in slides" :key="i">
                <img :src="slide.image" class="main-image" />
            </swiper-slide>

            <!-- <div class="swiper-pagination main"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->
        </swiper>

        <div class="thumbnail-slider">
            <swiper :options="thumbSwiperOptions" ref="thumbSwiper">
                <swiper-slide v-for="(thumb, i) in slides" :key="'thumb' + i">
                    <img :src="thumb.thumbnail" class="thumbnail-img" @click.stop="goToSlide(i)" />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
  
  
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            mainSwiperInstance: null,
            slides: [
                {
                    image: require('@/assets/images/pet-banner1.jpg'),
                    thumbnail: require('@/assets/images/pet-banner1.jpg'),
                },
                {
                    image: require('@/assets/images/pet-banner2.jpg'),
                    thumbnail: require('@/assets/images/pet-banner2.jpg'),
                },
                {
                    image: require('@/assets/images/pet-banner3.png'),
                    thumbnail: require('@/assets/images/pet-banner3.png'),
                },
            ],
            mainSwiperOptions: {
                loop: false,
                speed: 600,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                effect: 'fade',
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true,
                // },
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
            },
            thumbSwiperOptions: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
        };
    },
    mounted() {
        this.$nextTick(() => {
            const mainSwiper = this.$refs.mainSwiper?.swiper;
            if (mainSwiper) {
                console.log("✅ Main Swiper ready in mounted():", mainSwiper);
            } else {
                console.warn("⛔ Main Swiper still not ready in mounted()");
            }
        });
    },
    methods: {
        onMainSwiperReady(swiper) {
            console.log("✅ Swiper ready:", swiper);
            this.mainSwiperInstance = swiper;
        },
        goToSlide(index) {
            console.log("👉 goToSlide called with index:", index);
            if (this.mainSwiperInstance) {
                this.mainSwiperInstance.slideTo(index);
            } else {
                console.warn("⛔ mainSwiperInstance not ready");
            }
        },
    },
};
</script>
  
  
<style scoped>
.swiper-container {
    margin-left: auto;
    margin-right: 0;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
}
.main-banner-wrapper {
    position: relative;
}

.main-image {
    width: 100%;
}

.thumbnail-slider {
    position: absolute;
    bottom: 10px;
    right: 0px;
    width: 70%;
    background: transparent;
    padding: 10px 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
}

.thumbnail-img {
    width: 200px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 10px;
    border: 2px solid transparent;
    transition: border 0.3s;
}

.thumbnail-img:hover {
    border-color: orange;
    cursor: pointer;
}

.swiper-button-next,
.swiper-button-prev {
    width: 40px;
    height: 40px;
}

.swiper-button-next::after,
.swiper-button-prev::after {
    color: white;
    /* ✅ เปลี่ยนสีลูกศรที่เป็น pseudo-element */
    font-size: 20px;
    /* ปรับขนาดตามต้องการ */
}
</style>
  
  