import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state: {
        userId: null,
        token: null,
        tokenExpiration: null,
        errors: null
    },
    mutations,
    actions,
    getters
}