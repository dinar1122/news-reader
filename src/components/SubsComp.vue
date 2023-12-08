<template>
  <div style="width: 900px">
    <div class="category-list subs">
      <div class="category-title my-subs-title" style=" ">
        <router-link :to="'/subs'">
          <div style="padding: 4px 10px 4px 0; ">My subscriptions </div>
        </router-link>
        <div class="switcher">
          <input type="checkbox" id="switcher" v-model="switcher" @change="handleChange" class="switch-input">
          <label for="switcher" class="switch-label"></label>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:switcher']);
const switcher = ref(false);

const handleChange = () => {
  emit('update:switcher', switcher.value);
};
</script>
<style>
@import "./../assets/base.css";
</style>