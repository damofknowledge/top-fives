import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineNuxtPlugin((nuxtApp) => {
  // console.log('[Plugin]', 'Font Awesome');
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
