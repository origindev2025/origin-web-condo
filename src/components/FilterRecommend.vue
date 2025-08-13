<template>
  <div class="recommend-projects container py-5">
    <!-- Title -->
    <div class="text-center mb-4">
      <h3 class="fw-bold">{{ $t('besideYou.recommendTitle') }}</h3>
      <p class="text-muted">{{ $t('besideYou.recommendSubtitle') }}</p>
    </div>

    <!-- Filter Buttons -->
    <div class="filter-buttons d-flex justify-content-center mb-4 flex-wrap gap-2">
      <button v-for="type in projectTypes" :key="type.slug" @click="selectType(type.slug)" class="btn"
        :class="selectedType === type.slug ? 'btn-orange' : 'btn-outline-secondary'">
        {{ $t(type.label) }}
      </button>
    </div>


    <div class="scrolling-wrapper d-flex flex-nowrap overflow-auto pt-2">
      <div v-for="project in filteredProjects" :key="project.id" class="project-card text-white me-3 flex-shrink-0">
        <div class="image-wrapper position-relative">
          <img :src="project.thumbnail_url" class="card-img" :alt="project.project_name" />
          <span class="badge badge-overlay bg-primary">
            {{ $t('besideYou.projects.' + selectedType) }}
          </span>
        </div>

        <div class="card-overlay d-flex flex-column justify-content-end p-3">
          <h6 class="fw-bold mb-1">{{ project.project_name }}</h6>
          <p class="mb-3">{{ project.location }}</p>
          <p class="mb-0 small">{{ $t('besideYou.startPrice') }}</p>

          <div class="d-flex align-items-end">
            <h3 class="mb-0 me-1 fw-bold">{{ formatPrice(project.price_min) }}</h3>
            <span class="small">{{ $t('besideYou.unit') }}</span>
          </div>
        </div>
        <div class="arrow-button">
          <button class="arrow-btn-custom btn rounded-circle">
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecommendProjects",
  data() {
    return {
      selectedType: "ready",
      allProjects: [],
      projectTypes: [
        { slug: "ready", label: "besideYou.projects.ready" },
        { slug: "new", label: "besideYou.projects.new" },
        { slug: "pet_friendly", label: "besideYou.projects.pet" },
        { slug: "near_bts", label: "besideYou.projects.bts" },
      ],
    };
  },
  computed: {
    filteredProjects() {
      return this.allProjects[this.selectedType] || [];
    },
  },
  async mounted() {
    await this.fetchProjects(this.$i18n.locale);
  },
  watch: {
    '$i18n.locale'(newLang) {
      this.fetchProjects(newLang);
    }
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
    },
    async fetchProjects(lang) {
      try {
        const res = await axios.get(`http://localhost:4000/api/project_recommend`, {
          params: { lang },
        });
        this.allProjects = res.data;
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    },
    formatPrice(val) {
      if (!val || isNaN(val)) return "-";
      const millionValue = parseFloat(val) >= 1000000 ? parseFloat(val) / 1000000 : parseFloat(val);
      return millionValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  },
};
</script>

<style scoped>
.recommend-projects .btn-orange {
  background-color: #ff6600;
  color: white;
  border: none;
}

.recommend-projects .btn-orange:hover {
  opacity: 0.9;
}

.project-card {
  position: relative;
  width: 250px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;
  /* fallback bg */
}

.image-wrapper img.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 80%);
  color: white;
}

.badge-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.75rem;
}

.arrow-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.arrow-btn-custom {
  background-color: #eaf1ff;
  color: #1a51e8;
  border: none;
}

.arrow-btn-custom:hover {
  background-color: #dbe7ff;
  color: #1a51e8;
}
</style>
  
  