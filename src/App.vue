<script  >
import { RouterView } from "vue-router";
export default {
  name: 'App',
  components: {
    RouterView
  }
}
</script>
<template>
  <div style="width: 1210px; margin: auto;">
    <div class="category-list" style="height: 50px; margin-top: -45px;"></div>
    <RouterView />
  </div>
</template>

