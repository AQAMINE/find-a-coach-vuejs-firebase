import Test from '../components/Test.vue'

const routes = [{
        path: '/test',
        component: Test
    },
    {
        path: '/',
        redirect: '/coaches'
    },
    {
        path: '/coaches',
        component: null,
        children: [
            { path: 'contact', component: null } // /coaches/id/contact
        ]
    },
    {
        path: '/coaches/:id',
        component: null
    },
    {
        path: '/register',
        component: null
    },
    {
        path: '/requests',
        component: null
    },
    {
        path: '/:notFound(.*)',
        component: null
    }

];

export default routes;