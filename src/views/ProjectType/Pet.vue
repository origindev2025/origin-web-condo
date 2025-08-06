<template>
    <div class="container py-5">
      <h2 class="text-orange fw-bold mb-4">{{ $t('besideYou.projects.pet') }}</h2>
  
      <div v-if="projects.length > 0" class="row">
        <div v-for="(project, index) in projects" :key="index" class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img :src="project.thumbnail_url" class="card-img-top" :alt="project.project_name" />
            <div class="card-body">
              <h5 class="card-title">{{ project.project_name }}</h5>
              <p class="card-text">{{ project.location }}, {{ project.region }}</p>
              <p class="text-muted">
                {{ formatPrice(project.price_min) }} - {{ formatPrice(project.price_max) }} บาท
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center text-muted">
        <p>ยังไม่มีโครงการที่เลี้ยงสัตว์ได้ในขณะนี้</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PetFriendlyProjects',
    data() {
      return {
        projects: [],
      };
    },
    async created() {
      try {
        const lang = this.$i18n.locale;
        const url = `http://localhost:4000/api/project_recommend/filter?lang=${lang}&category=pet_friendly`;
        const response = await axios.get(url);
        this.projects = response.data;
      } catch (error) {
        console.error('Error loading pet-friendly projects:', error);
      }
    },
    methods: {
      formatPrice(value) {
        return value ? value.toLocaleString() : '-';
      },
    },
  };
  </script>
  
  <style scoped>
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  </style>
  