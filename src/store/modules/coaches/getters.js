export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },

    //to use global modul and local modul we need to use all parameter (state,getters,rootState,rootGetters) and we will use this syntax (_, getters, _2, rootGetters) cause state and rootState not using in this function 
    //isCoach to hide or show register button 
    isCoach(_, getters, _2, rootGetters) {
        const coaches = getters.coaches;
        const userId = rootGetters.userId; //rootGetters ==> getters of the index file the main store file 
        return coaches.some(coach => coach.id === userId);
    },
    errors(state) {
        return state.errors;
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        //this calcule means last fetch more than 1 minute so its return true
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};