import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import store from '../store/index'




// const routes = [{
//         path: '/coaches',
//         component: null
//     },
//     {
//         path: '/coaches/:id',
//         component: null
//     },
// ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//Auth
router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router