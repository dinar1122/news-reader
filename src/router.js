import { createRouter, createWebHistory } from 'vue-router';
import HomePageVue from "./views/HomePage.vue";
import SubsPageVue from './views/SubsPage.vue';


const routes = [
  { path: '/', 
  component: HomePageVue },
  { path: '/subs', 
  component: SubsPageVue },
]
const router = createRouter({
  history: createWebHistory(),
  routes})

  

  export default router;