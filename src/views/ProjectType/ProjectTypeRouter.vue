<template>
  <component :is="viewComponent" :key="componentKey" />
</template>

<script>
import Ready from './Ready.vue';
import New from './New.vue';
import Pet from './Pet.vue';
import BTS from './BTS.vue';
import NotFound from './NotFound.vue';

export default {
  computed: {
    componentKey() {
      return this.$route.params.slug; // สำคัญ!
    },
    viewComponent() {
      const slug = this.$route.params.slug;
      switch (slug) {
        case 'ready': return Ready;
        case 'new': return New;
        case 'pet_friendly': return Pet;
        case 'near_bts': return BTS;
        default: return NotFound;
      }
    }
  },
  watch: {
    '$route.params.slug'(val) {
      console.log('Slug changed to:', val);
    }
  }
};
</script>
