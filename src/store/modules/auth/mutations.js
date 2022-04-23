export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    },
    seetErrors(state, payload) {
        state.errors = payload;
    }
}