import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const app = createApp(App);



//Global Components
import BaseCard from './components/layout/ui/BaseCard.vue';
import BaseButton from './components/layout/ui/BaseButton.vue';
import BaseBadge from './components/layout/ui/BaseBadge.vue';
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);


app.use(store);
app.use(router);
app.mount('#app');