import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'

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

export default router