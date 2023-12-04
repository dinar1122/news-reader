<template>
  <div class="category-list news-list-search" >
    <div style="display: flex;">
      <input v-model="value" class="search" type="text">
      <div @click="search" class="category-title search-title" >Search</div>
    </div>

  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';



const emit = defineEmits(['custom-event', 'update:modelValue']);
const props = defineProps(['modelValue']);

const value = ref(props.modelValue )
function search() {
  console.log('seacrh', value.value)
  emit('custom-event');
  emit('update:modelValue', value.value);
}

</script>
<style>
@import "./../assets/base.css";
</style>