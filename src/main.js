import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// To Use Axios Globaly
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';

//Start Toaster
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.Toast = Toast;
//End Toaster


const app = createApp(App);



//Global Components
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);

app.use(store);
app.use(router);
app.mount('#app');