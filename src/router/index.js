import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import About from '@/components/About';
import micSettings from '@/components/micSettings'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/About',
      name: 'About',
      component: About,
    },
    {
      path: '/Settings',
      name: 'micSettings',
      component: micSettings,
    },
  
  ],
});