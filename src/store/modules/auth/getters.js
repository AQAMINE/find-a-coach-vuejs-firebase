export default {
    userId(state) {
        return state.userId;
    },
    getErrors(state) {
        return state.errors;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        //!! to convert value to a boolen 
        return !!state.token;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
}