<template>
  <div class="category-list">
    <div class="category-title-container">
      <div class="category-title category-texted" style="float: inline-end; " @click="showMore">{{ category.name }}</div>
      <button v-if="visible" @click="showMore" class="category-title category-texted">Показать больше</button>
      <button v-if="!visible" @click="hide" class="category-title category-texted">Показать меньше</button>
    </div>
    <div class="category-list-items">
      <NewsItem v-for="(info, key) in dataResponse" :key="key" :info="info" :title="info.title"
        :description="info.description" :urlToImage="info.urlToImage" :url="info.url" :source="info.source.name" />
    </div>
  </div>
</template>

<script setup>
import NewsItem from '../components/NewsItem.vue'
import { defineProps } from 'vue';
import { onMounted, ref } from 'vue';
import newsService from '@/services/newsService';

let visible = true
const category = defineProps({
  name: String,
  switcherSubsFilter: Boolean,
});

function showMore() {
  visible = !visible;
  fetchNews(24);
}

function hide() {
  visible = !visible
  fetchNews(4)
}

let dataResponse = ref({});

const fetchNews = (pageSize) => {
  newsService.getNewsEnByCategory(category.name, pageSize)
    .then(response => {
      dataResponse.value = response.data.articles
    }).catch(error => {
      console.log(error)
    });
};

onMounted(fetchNews);
</script>

<style></style>