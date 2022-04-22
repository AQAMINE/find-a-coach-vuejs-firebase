export default {
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    },
    setErrors(state, error) {
        state.errors = error;
    },
    setFetchTimesTamp(state) {
        state.lastFetch = new Date().getTime();
    }

};