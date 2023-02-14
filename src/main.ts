import { createApp } from 'vue';
import App from './App.vue';

import '@fontsource/work-sans/variable.css';
import '@mdi/font/scss/materialdesignicons.scss';
import './reset.scss';
import './style.scss';

const Vue = createApp(App);

Vue.mount('#app');
