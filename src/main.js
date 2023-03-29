import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

import Main from './components/settings/Main';
import Home from './components/Home';
import Dashboard from './components/admin/Dashboard';
import ClientListing from './components/admin/clients/ClientListing';
import OnboardClient from './components/admin/clients/OnboardClient';

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/settings',
      component: Main,
    },
    {
      path: '/admin',
      component: Dashboard,
      children: [
        {
          path: 'clients',
          component: ClientListing
        },
        {
          path: 'onboard',
          component: OnboardClient
        }
      ]
    }
  ],
});

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).use(router).mount('#app')

