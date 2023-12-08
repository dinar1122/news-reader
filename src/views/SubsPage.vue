<template>
  <router-link :to="'/'">
    <div class=" home-button" style="">Home</div>
  </router-link>
  <div class="category-list subs-page-container">
    <div v-if="!subs.length" class="no-data"> No
      subscriptions
    </div>
    <div class="subs-page-item" v-for="name in subs" :key="name">
      <div class="category-title">{{ name }}</div>
      <div class="category-title" @click="unsub(name)">Unsubscribe</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const subs = ref(JSON.parse(localStorage.getItem('newsSources')))
function unsub(sourceName) {
  let indexSourceInLocal = subs.value.indexOf(sourceName)
  if (indexSourceInLocal !== -1) {
    subs.value.splice(indexSourceInLocal, 1)
    localStorage.setItem('newsSources', JSON.stringify(subs.value));
  }
}
</script>
<style>
@import "./../assets/base.css";
</style>
