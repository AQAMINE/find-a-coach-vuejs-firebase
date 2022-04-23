//components

import NotFund from '../views/NotFound.vue'
import CoachDetail from '../views/coaches/CoachDetail.vue'
import CoachsList from '../views/coaches/CoachesList.vue'
import CoachRegistration from '../views/coaches/CoachRegistration.vue'
import RequestRecived from '../views/requests/RequestsRecived.vue'
import ContactCoach from '../views/requests/ContactCoach.vue'
import UserAuth from '../views/auth/UserAuth.vue';

const routes = [{
        path: '/',
        redirect: '/coaches'
    },
    {
        path: '/coaches',
        component: CoachsList,
    },
    {
        path: '/coaches/:id',
        component: CoachDetail,
        props: true,
        children: [
            { path: 'contact', component: ContactCoach } // /coaches/id/contact
        ]
    },
    {
        path: '/register',
        component: CoachRegistration
    },
    {
        path: '/requests',
        component: RequestRecived
    },
    {
        path: '/auth',
        component: UserAuth
    },
    {
        path: '/:notFound(.*)',
        component: NotFund
    }

];

export default routes;