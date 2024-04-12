import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import Propiedades from './views/Propiedades.vue'; // Asegúrate de que este archivo exista
import Rentas from './views/Rentas.vue'; // Asegúrate de que este archivo exista

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/propiedades',
    component: Propiedades
  },
  {
    path: '/rentas',
    component: Rentas
  }
  // Puedes añadir más rutas según sea necesario
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
