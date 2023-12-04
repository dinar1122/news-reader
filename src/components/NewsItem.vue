<template>
  <div class="card">
    <a :href="props.url" class="a-item">
      <div>
        <img :src="props.urlToImage" class="image" />
      </div>
      <div class="item-container ">
        <div>
          <h4 style="margin: 10px 0 10px 0;">{{ props.title }}</h4>
        </div>
        <div class="item-desc"> {{ trimmedDescription }} {{ shouldShowEllipsis ? '...' : '' }}</div>
        <div class="item-footer">
          <div class="category-title">{{ trimmedSource }}{{ shouldShowEllipsisForSource ? '...' : '' }}</div>
          <div v-if="!isExistLocal" title="Подписаться" @click="subscribe" class="category-title subscribe-elem">+</div>
          <div v-else title="Отписаться" @click="unsubscribe" class="category-title subscribe-elem">-</div>
          <div style="flex-grow: 1;">
            <div class="formatted-time">{{ formattedTime }}</div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script setup>
import { defineProps, watchEffect } from 'vue';
import { ref } from 'vue';
import moment from 'moment';

const props = defineProps({
  title: String,
  description: String,
  urlToImage: String,
  url: String,
  source: String,
  publishedAt: String
});

const dateTime = moment(props.publishedAt);
let formattedTime = dateTime.format('DD.MMM');
const trigger = ref(false);
const isExistLocal = ref(false);

let trimmedSource = ref(props.source)
let shouldShowEllipsisForSource = false;
let symbolLimitForSourceTitle = 13
if (props.source) {
  if (props.source.length > symbolLimitForSourceTitle) {
    trimmedSource = props.source.slice(0, -(props.source.length - symbolLimitForSourceTitle))
    shouldShowEllipsisForSource = true
  }
}

let trimmedDescription = ref(props.description)
let shouldShowEllipsis = false;
if (props.description) {
  if (props.description.length > 200) {
    trimmedDescription = props.description.slice(0, -(props.description.length - 200));//срезаю лишнее описание
    shouldShowEllipsis = true
  }
}


function subscribe(event) {
  const existingSourcesFunc = JSON.parse(localStorage.getItem('newsSources')) ?? []
  event.preventDefault();
  let sourceName = props.source.toLowerCase().replaceAll(' ', '-')//добавляю имена в локалстор преобразовывая для использования в качестве айди, так как ответе от апи в айди иногда нет данных
  if (!existingSourcesFunc.includes(sourceName)) {
    existingSourcesFunc.push(sourceName)
    localStorage.setItem('newsSources', JSON.stringify(existingSourcesFunc));
  }
  trigger.value = !trigger.value;
}

function unsubscribe(event) {
  event.preventDefault();
  const existingSourcesFunc = JSON.parse(localStorage.getItem('newsSources')) ?? []
  let sourceName = props.source
  sourceName = sourceName.toLocaleLowerCase().replaceAll(' ', '-')
  console.log()
  if ((existingSourcesFunc.indexOf(sourceName)) !== -1) {
    existingSourcesFunc.splice((existingSourcesFunc.indexOf(sourceName)), 1)
    localStorage.setItem('newsSources', JSON.stringify(existingSourcesFunc));
  }
  trigger.value = !trigger.value;
}

watchEffect(() => {
  const sources = JSON.parse(localStorage.getItem('newsSources')) ?? [];
  const sourceName = props.source.toLowerCase().replaceAll(' ', '-');
  isExistLocal.value = sources.includes(sourceName);
  if (trigger.value) { trigger.value = !trigger.value } //вызвал изменеие переменной isExistLocal с помощью триггера
});

</script>
<style>
@import "./../assets/base.css";</style>