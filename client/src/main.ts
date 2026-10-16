import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './routes';

// Create Vue application instance
const app = createApp(App);

// Register plugins
app.use(createPinia());
app.use(router);

// Mount to #app element in index.html
app.mount('#app');