<template>
    <div class="search-wrapper py-5 text-center">
        <h3 class="fw-bold mb-1">{{ $t('search.title') }}</h3>
        <p class="text-muted mb-4">{{ $t('search.subtitle') }}</p>

        <div class="filter-card mx-auto p-4">
            <div class="row g-3">

                <!-- แบรนด์ -->
                <div class="col-md-3 col-sm-6">
                    <label class="form-label d-flex align-items-center gap-1">
                        <i class="bi bi-buildings text-orange me-1"></i> {{ $t('search.brand') }}
                    </label>
                    <select class="form-select" v-model="filters.brand">
                        <option value="">{{ $t('search.selectBrand') }}</option>
                        <option v-for="brand in brands" :key="brand.slug" :value="brand.slug">
                            {{ brand.name }}
                        </option>
                    </select>
                </div>

                <!-- ทำเลที่ตั้ง -->
                <div class="col-md-3 col-sm-6">
                    <label class="form-label d-flex align-items-center gap-1">
                        <i class="bi bi-geo-alt text-orange me-1"></i> {{ $t('search.location') }}
                    </label>
                    <select class="form-select" v-model="filters.location">
                        <option value="">{{ $t('search.selectLocation') }}</option>
                        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                    </select>
                </div>

                <!-- ช่วงราคา -->
                <div class="col-md-3 col-sm-6">
                    <label class="form-label d-flex align-items-center gap-1">
                        <i class="bi bi-cash-stack text-orange me-1"></i> {{ $t('search.price') }}
                    </label>
                    <select class="form-select" v-model="filters.priceRange">
                        <option value="">{{ $t('search.selectPrice') }}</option>
                        <option v-for="range in priceRanges" :key="range.label" :value="range">
                            {{ $t(range.label) }}
                        </option>
                    </select>
                </div>

                <!-- สถานะโครงการ -->
                <div class="col-md-3 col-sm-6">
                    <label class="form-label d-flex align-items-center gap-1">
                        <i class="bi bi-building-check text-orange me-1"></i> {{ $t('search.status') }}
                    </label>
                    <select class="form-select" v-model="filters.status">
                        <option value="">{{ $t('search.selectStatus') }}</option>
                        <option value="ready">{{ $t('search.statusOptions.ready') }}</option>
                        <option value="new">{{ $t('search.statusOptions.new') }}</option>
                        <option value="pet_friendly">{{ $t('search.statusOptions.pet_friendly') }}</option>
                        <option value="near_bts">{{ $t('search.statusOptions.near_bts') }}</option>
                    </select>
                </div>

            </div>

            <!-- ปุ่มค้นหา -->
            <button class="btn btn-orange mt-4 px-5 py-2" @click="searchProjects">
                {{ $t('search.searchButton') }}
            </button>
        </div>
    </div>
</template>
  
  
<script>
import axios from "axios";
import { mapActions } from 'vuex';
import { GET_DATA_BRAND, GET_DATA_LOCATION } from '@/store/actions.type';
import store from "@/store";

export default {
    name: "Search",
    data() {
        return {
            filters: {
                lang: "th",
                brand: "",
                location: "",
                priceRange: "",
                status: ""
            },
            brands: [],
            locations: [],
            // priceRanges: [
            //     { label: "1 - 3 ล้านบาท", min: 1000000, max: 3000000 },
            //     { label: "3 - 5 ล้านบาท", min: 3000000, max: 5000000 },
            //     { label: "6 ล้านบาทขึ้นไป", min: 6000000, max: 999999999 }
            // ]
            priceRanges: [
                { label: 'priceRange.range1', min: 1000000, max: 3000000 },
                { label: 'priceRange.range2', min: 3000000, max: 5000000 },
                { label: 'priceRange.range3', min: 6000000, max: 999999999 }
            ]
        };
    },
    created() {
        this.BrandData();
        this.LocationsData();

        console.log(this.$i18n.locale);
    },
    watch: {
        '$i18n.locale'(newLocale) {
            this.BrandData();
            this.LocationsData();
        }
    },
    methods: {

        async BrandData(lang = 'th') {
            const data = await store.dispatch(`brand/${GET_DATA_BRAND}`, this.$i18n.locale);
            this.brands = data;
            console.log('brand data', data);
        },

        async LocationsData(lang = 'th') {
            const data = await store.dispatch(`location/${GET_DATA_LOCATION}`, this.$i18n.locale);
            this.locations = data;
            console.log('brand data locations', data);
        },

        async searchProjects() {
            const { brand, location, status, priceRange } = this.filters;
            const url = "http://localhost:4000/api/project_search/projects";

            const params = {
                lang: this.$i18n.locale,
                ...(brand && { brand }),
                ...(location && { location }),
                ...(status && { status }),
                ...(priceRange && {
                    price_min: priceRange.min,
                    price_max: priceRange.max
                })
            };

            try {
                const res = await axios.get(url, { params });
                console.log("ค้นหาแล้วได้ผลลัพธ์:", res.data);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการค้นหา:", err);
            }
        },

    }


};
</script>
  
<style scoped>
.text-orange {
    color: #F46E0B;
}

.search-wrapper {
    background-color: #fff;
}

.filter-card {
    max-width: 1000px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.btn-orange {
    background-color: #F46E0B;
    color: white;
    font-weight: 600;
    border-radius: 8px;
    transition: 0.2s ease;

    &:hover {
        background-color: #e65a00;
    }
}
</style>
  