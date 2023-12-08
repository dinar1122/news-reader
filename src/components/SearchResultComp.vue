<template>
  <div class="category-list">
    <div class="category-title-container">
      <div v-if="data.dataResponse" class="category-title category-texted">{{ data.reqName ?? 'Все записи' }} </div>
    </div>
    <div class="category-list-items" v-if="data.dataResponse">
      <NewsItem v-for="(info, key) in dataResponse" :key="key" :info="info" :title="info.title"
        :description="info.description" :urlToImage="info.urlToImage" :url="info.url" :source="info.source.name"
        :publishedAt="info.publishedAt" />
    </div>
    <div v-else class="no-data" >No
      subscriptions</div>
  </div>
</template>
<script setup>
import NewsItem from '../components/NewsItem.vue'
import { defineProps } from 'vue';

const data = defineProps({
  reqName: String,
  dataResponse: Object,
});
</script>