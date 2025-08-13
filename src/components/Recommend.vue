<template>
    <div class="beside-you-section container py-5">
        <div class="row align-items-end">
            <!-- LEFT -->
            <div class="col-lg-6 position-relative text-white big-banner-wrapper">
                <img src="@/assets/images/type/banner-main.png" alt="Main Banner" class="img-fluid rounded shadow" />
                <div class="banner-overlay"></div>
                <div class="banner-text text-start">
                    <h3 class="fw-bold mb-4">{{ $t('besideYou.left.title') }}</h3>
                    <p class="fw-light mb-1">{{ $t('besideYou.left.subtitle1') }}</p>
                    <p class="fw-bold">{{ $t('besideYou.left.subtitle2') }}</p>
                </div>
            </div>

            <!-- RIGHT -->
            <div class="col-lg-6 mt-lg-0 d-flex flex-column justify-content-between h-100 bg-light rounded-end pt-4">
                <div class="position-relative ps-4 mb-3">
                    <span class="highlight-line"></span>
                    <h2 class="text-orange fw-bold mt-2">{{ $t('besideYou.right.highlight') }}</h2>

                    <h3 class="fw-bold">{{ $t('besideYou.right.title') }}</h3>
                    <p class="text-muted">{{ $t('besideYou.right.desc') }}</p>
                </div>


                <!-- Card Slider Wrapper -->
                <div class="card-slider-wrapper position-relative ">
                    <!-- Arrow Buttons -->
                    <div class="arrow-buttons position-absolute">
                        <button class="btn btn-outline-secondary btn-sm rounded-circle me-2" @click="scrollLeft">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm rounded-circle" @click="scrollRight">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>

                    <!-- Card Slider -->
                    <div ref="cardSlider" class="card-slider d-flex flex-nowrap overflow-auto pt-2">
                        <router-link v-for="(item, i) in projects" :key="i" :to="`/${$i18n.locale}/${item.slug}`"
                            class="card rounded-3 me-3 shadow-sm project-card text-decoration-none"
                            @click.native="debugSlug(item.slug)">
                            <img :src="item.image" class="card-img-top" alt="..." />
                            <div class="card-img-overlay d-flex align-items-center justify-content-center p-2">
                                <h6 class="text-white fw-bold w-100 text-center">{{ item.name }}</h6>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import { GET_DATA_RECOMMEND } from '@/store/actions.type';

export default {
    name: "BesideYouSection",
    data() {
        return {
            // projects: [],
            images: [
                require('@/assets/images/type/ready.png'),
                require('@/assets/images/type/new.png'),
                require('@/assets/images/type/pet_friendly.png'),
                require('@/assets/images/type/near_bts.png')
            ]
        };
    },
    computed: {
        projects() {
            return [
                {
                    name: this.$t('besideYou.projects.ready'),
                    slug: 'ready',
                    image: this.images[0]
                },
                {
                    name: this.$t('besideYou.projects.new'),
                    slug: 'new',
                    image: this.images[1]
                },
                {
                    name: this.$t('besideYou.projects.pet'),
                    slug: 'pet_friendly',
                    image: this.images[2]
                },
                {
                    name: this.$t('besideYou.projects.bts'),
                    slug: 'near_bts',
                    image: this.images[3]
                }
            ];
        }
    },
    async mounted() {
        await this.$store.dispatch(`project_recommend/${GET_DATA_RECOMMEND}`, this.$i18n.locale);
    },
    methods: {
        debugSlug(slug) {
            console.log("Navigating to slug:", slug);
        },
        scrollLeft() {
            this.$refs.cardSlider?.scrollBy({ left: -200, behavior: 'smooth' });
        },
        scrollRight() {
            this.$refs.cardSlider?.scrollBy({ left: 200, behavior: 'smooth' });
        }
    }
};
</script>

  

<style scoped>
.text-orange {
    color: #F46E0B;
    font-weight: bold;
}

.big-banner-wrapper {
    height: 100%;
    overflow: hidden;
}

.big-banner-wrapper img {
    width: 100%;
    height: auto;
    border-radius: 12px;
}

.banner-text {
    color: white;
    max-width: 100%;
}

.project-card {
    width: 160px;
    height: 100%;
    flex: 0 0 auto;
    /* สำคัญมาก: ห้ามยืด-หด */
    overflow: hidden;
    position: relative;
}

.card-img-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
    pointer-events: none;
}

.card-img-overlay h6 {
    pointer-events: auto;
}

.card-slider {
    scroll-behavior: smooth;
    white-space: nowrap;
    overflow-x: auto;
    max-width: 100%;
    height: 100%;
    /* เพิ่มบรรทัดนี้ */
}

.big-banner-wrapper {
    height: 100%;
    overflow: hidden;
    position: relative;
}

.big-banner-wrapper img {
    width: 100%;
    height: auto;
    border-radius: 12px;
}

/* พื้นหลัง overlay */
.banner-overlay {
    position: absolute;
    top: 0;
    /* left: 0; */
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent);
    border-radius: 12px;
    z-index: 1;
}

/* ข้อความบนภาพ */
.banner-text {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    z-index: 2;
    color: white;
    max-width: 100%;
}

/* เส้นสีน้ำเงินด้านหน้า heading */
.highlight-line {
    position: absolute;
    left: 0;
    top: -15px;
    width: 8px;
    height: 100px;
    background-color: #0251E8 !important;
    /* สีฟ้าน้ำเงิน */
    border-radius: 2px;
}

/* สีพื้นหลังฝั่งขวา */
.bg-light {
    background-color: #f5f5f5 !important;
}

.card-slider-wrapper {
    position: relative;
    padding-top: 40px;
}

.arrow-buttons {
    top: 0;
    right: 10px;
    z-index: 2;
}
</style>
  
  