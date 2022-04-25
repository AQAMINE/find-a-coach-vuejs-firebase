//components
import CoachsList from '../views/coaches/CoachesList.vue'


//import this component just when we needed 
const NotFund = () =>
    import ('../views/NotFound.vue');

const CoachDetail = () =>
    import ('../views/coaches/CoachDetail.vue');

const CoachRegistration = () =>
    import ('../views/coaches/CoachRegistration.vue');

const ContactCoach = () =>
    import ('../views/requests/ContactCoach.vue');

const RequestRecived = () =>
    import ('../views/requests/RequestsRecived.vue');

const UserAuth = () =>
    import ('../views/auth/UserAuth.vue');



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
        component: CoachRegistration,
        meta: { requiresAuth: true }
    },
    {
        path: '/requests',
        component: RequestRecived,
        meta: { requiresAuth: true }
    },
    {
        path: '/auth',
        component: UserAuth,
        meta: { requiresUnauth: true }
    },
    {
        path: '/:notFound(.*)',
        component: NotFund
    }

];



export default routes;