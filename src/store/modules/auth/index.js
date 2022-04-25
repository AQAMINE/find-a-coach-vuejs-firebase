import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    state: {
        userId: null,
        token: null,
        errors: '',
        didAutoLogout: false
    },
    mutations,
    actions,
    getters
}