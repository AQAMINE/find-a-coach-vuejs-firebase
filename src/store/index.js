import { createStore } from 'vuex'

import coachesModule from './modules/coaches/index';

export default createStore({
    modules: {
        coaches: coachesModule,
    },
    state: {
        userId: 'c3'
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    },
    mutations: {},
    actions: {},
})