<template>
  <div>
    <div class="search-subs-container">
      <SearchComp @custom-event="search" v-model="searchValue" />
      <SubsComp v-model:switcher="switcherSubsFilter" />
    </div>
    <SearchResultComp v-if="!!searchValue" :dataResponse="dataResponse" :reqName="searchValue" />
    <div v-if="!switcherSubsFilter">
      <CategoryedList v-for="name in categoryName" :key="name" :name="name" :switcherSubsFilter="switcherSubsFilter" />
    </div>
    <div v-else>
      <SearchResultComp :dataResponse="dataResponseBySubs" />
    </div>
  </div>
</template>

<script setup>
import SearchResultComp from '@/components/SearchResultComp.vue';
import CategoryedList from '@/components/CategoryedList.vue';
import SearchComp from '@/components/SearchComp.vue';
import SubsComp from '@/components/SubsComp.vue';
import { ref, watch, computed, watchEffect } from 'vue';
import newsService from '@/services/newsService';

const categoryName = ['general',
  'entertainment',
  'business',
  'health',
  'science',
  'sports',
  'technology']

let previousSearchValue = '';

const dataResponseBySubs = ref(null)
const dataResponse = ref(null)
const searchValue = ref('');
const switcherSubsFilter = ref(false)

localStorage.setItem('newsSources', JSON.stringify([]));

const sources = computed(() => switcherSubsFilter.value ? JSON.parse(localStorage.getItem('newsSources')).join(',') : ''); //беру источники из локал

const fetchNewsBySubs = (sources) => {
  if (sources === '') return {}
  newsService.getNewsBySubsFilter(sources)
    .then(response => {
      dataResponseBySubs.value = response.data.articles
    }).catch(error => {
      console.log(error)
    });
};

watchEffect(() => {
  fetchNewsBySubs(sources.value);
});

function search() {
  console.log(sources.value);
  if (searchValue.value !== previousSearchValue) {

    fetchNewsByReq(searchValue.value)
    previousSearchValue = searchValue.value;
  }
}
const fetchNewsByReq = (req) => {
  newsService.getNewsByReq(req)
    .then(response => {
      dataResponse.value = response.data.articles
      console.log(dataResponse)
    }).catch(error => {
      console.log(error)
    });

};
watch(searchValue, search);
</script>