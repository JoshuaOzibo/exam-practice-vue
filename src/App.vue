<script >
import { RouterLink, RouterView } from 'vue-router';
import Home from './views/Home.vue';

export default {
  components: {
    RouterLink,
    RouterView
  }
}
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink> 
      <!-- <RouterLink to="/SingleRepo/:id">Single Repo</RouterLink> -->
    </nav>
    <Suspense>
      <RouterView>
        <template #fallback>
          <p>Loading...</p>
        </template>
      </RouterView>
    </Suspense>
  </div>
</template>