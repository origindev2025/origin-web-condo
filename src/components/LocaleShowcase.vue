<template>
    <section class="locale-showcase">
        <div class="container-xl">
            <div class="row g-4 align-items-stretch">
                <!-- Left: Hero -->
                <div class="col-lg-6">
                    <div class="hero-card">
                        <div class="hero-media" :style="`background-image:url(${heroImage})`"></div>
                        <div class="hero-content">
                            <h2 class="title" v-html="$t('LocaleShowcase.hero.title')"></h2>
                            <p class="subtitle mb-4">{{ $t('LocaleShowcase.hero.subtitle') }}</p>
                            <p class="desc">{{ $t('LocaleShowcase.hero.desc') }}</p>
                            <p class="desc">{{ $t('LocaleShowcase.hero.desc_2') }}</p>

            
                            <button class="cta-btn" @click="$emit('view-all')">
                                {{ $t('LocaleShowcase.hero.cta') }}
                                <span class="cta-icon">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right: Accordion -->
                <div class="col-lg-6">
                    <div class="acc-header-bg">
                        <div class="accordion-wrap">
                            <div v-for="(cat, i) in categories" :key="cat.key" class="acc-item"
                                :class="{ open: openIndex === i }">
                                <button class="acc-header" @click="toggle(i)">
                                    <span class="acc-title">{{ cat.title }}</span>
                                    <span class="chev">▾</span>
                                </button>

                                <div class="acc-body">
                                    <div class="card-grid">
                                        <article v-for="place in previewPlaces(cat.places)" :key="place.id"
                                            class="place-card">
                                            <img :src="place.image" :alt="place.name" />
                                            <div class="overlay">
                                                <div class="name">{{ place.name }}</div>
                                            </div>
                                        </article>

                                        <!-- “ดูทั้งหมด” tile -->
                                        <article class="place-card all-card" @click="onSeeAll(cat)">
                                            <div class="all-inner">
                                                <div class="all-text">{{ $t('LocaleShowcase.accordion.seeAll') }}</div>
                                                <div class="all-icon">→</div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Right -->
            </div>
        </div>

    </section>
</template>
  
<script>
import { GET_DATA_AREA } from '@/store/actions.type';

export default {
    name: 'LocaleShowcase',

    props: {
        heroImage: {
            type: String,
            default: require('@/assets/images/heroImage.png'),
        },
    },

    data: () => ({
        openIndex: 0,
        categories: [], // เก็บหมวดที่ normalize แล้วสำหรับ UI (มี places เสมอ)
    }),

    async mounted() {
        await this.load(this.$i18n.locale);
    },

    watch: {
        // เปลี่ยนภาษา → โหลดข้อมูลใหม่
        '$i18n.locale'(lang) { this.load(lang); }
    },

    methods: {
        // โหลดจาก Vuex แล้วแปลง {items} -> {places} ให้ template ใช้ง่าย
        async load(lang = 'th') {
            try {
                const res = await this.$store.dispatch(`area/${GET_DATA_AREA}`, lang);
                console.log(res);
                this.categories = (res?.categories ?? []).map(this.normalizeCategory);
                if (this.categories.length && this.openIndex >= this.categories.length) this.openIndex = 0;
            } catch (e) {
                console.error('area load error:', e);
                this.categories = [];
            }
        },

        // แปลง 1 category ของ API → โครงสำหรับ UI
        normalizeCategory(c) {
            const items = Array.isArray(c?.items) ? c.items : [];
            return {
                key: c?.key,
                title: c?.title ?? '',
                places: items.map((it, i) => ({
                    id: it.slug || it.key || i,
                    name: it.title || it.label || it.slug || it.key || '-',
                    image: it.thumbnail_url || it.image || '',
                    _raw: it, // เก็บต้นฉบับไว้เผื่อใช้ต่อ
                })),
                has_more: !!c?.has_more,
            };
        },

        // ป้องกัน list ว่าง/undefined ก่อน slice
        previewPlaces(list) {
            return Array.isArray(list) ? list.slice(0, 5) : [];
        },

        // เปิด/สลับ accordion
        toggle(i) { this.openIndex = i; },

        // ส่งต่อ event ให้ parent ใช้งาน (เช่น นำทางไปหน้า list ทั้งหมด)
        onSeeAll(cat) { this.$emit('see-all', cat); },
    },
};
</script>


  
<style scoped>
.acc-header-bg {
    background: #ffffff;
    padding: 10px;
}

/* --- Layout --- */
.locale-showcase {
    background: #fff;
    padding: 2.5rem 0;
}

@media (min-width: 992px) {
    .locale-showcase {
        padding: 3.5rem 0;
    }
}

/* --- Hero --- */
.hero-card {
    position: relative;
    height: 100%;
    min-height: 520px;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, .12);
}

.hero-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.02);
    filter: brightness(.7);
}

.hero-content {
    position: relative;
    z-index: 1;
    color: #fff;
    padding: 2rem 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: .75rem;
    height: 100%;
    justify-content: flex-start;
}

.title {
    font-weight: 800;
    font-size: clamp(24px, 4vw, 36px);
    margin: 0;
}

.accent {
    color: #ff7a00;
}

/* ส้มหลัก */
.subtitle {
    opacity: .95;
    margin: 0;
    font-size: 1.05rem;
}

.desc {
    opacity: .9;
    margin: .25rem 0 1rem;
    line-height: 1.6;
}

/* CTA */
.cta-btn {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    background: #121417;
    color: #fff;
    border: 0;
    border-radius: 10px;
    padding: .8rem 1.15rem;
    font-weight: 700;
    transition: transform .15s ease, box-shadow .2s ease;
    box-shadow: 0 6px 16px rgba(0, 0, 0, .25);
    width: fit-content;
}

.cta-btn:hover {
    transform: translateY(-1px);
}

.cta-icon {
    display: inline-flex;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;
    color: #121417;
    justify-content: center;
    align-items: center;
    font-weight: 800;
}

/* --- Accordion --- */
.accordion-wrap {
    display: grid;
    gap: 16px;
}

.acc-item {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
    border: 1px solid #f2e8df;
    overflow: hidden;
}

.acc-header {
    width: 100%;
    background: #ffffff;
    /* พื้นอ่อนโทนส้ม */
    padding: 18px 20px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-weight: 800;
    color: #2b2b2b;
}

.acc-item.open .acc-header {
    border-bottom: 1px solid #ffe1cc;
}

.acc-title {
    font-size: 1.05rem;
}

.chev {
    transition: transform .2s ease;
}

.acc-item.open .chev {
    transform: rotate(180deg);
}

.acc-body {
    display: none;
    padding: 16px 18px 20px;
    background: #fff;
}

.acc-item.open .acc-body {
    display: block;
}

/* --- Grid of cards --- */
.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.place-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    height: 110px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .08);
}

.place-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .3s ease;
}

.place-card:hover img {
    transform: scale(1.04);
}

/* overlay text */
.overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, .65) 100%);
    display: flex;
    align-items: flex-end;
    padding: 10px 12px;
}

.name {
    color: #fff;
    font-weight: 700;
    font-size: .95rem;
}

/* “ดูทั้งหมด” tile */
.all-card {
    background: #fff;
    border: 2px solid #ffa055;
    /* ส้มอ่อน */
    display: flex;
    align-items: center;
    justify-content: center;
}

.all-inner {
    display: flex;
    align-items: center;
    gap: 10px;
}

.all-text {
    color: #2b2b2b;
    font-weight: 800;
}

.all-icon {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background: #eff5ff;
    display: grid;
    place-items: center;
    font-weight: 900;
    color: #3a7cff;
}
</style>
  