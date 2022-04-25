export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: this.login
        })
    },
    async signup(context, payload) {
        return context.dispatch('signup', {
            ...payload,
            mode: this.login
        })
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEmphwbbXJI0LugV2mU_NONu2fou4xIrg';

        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEmphwbbXJI0LugV2mU_NONu2fou4xIrg';
        }
        await window.axios.post(url, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
            .then(response => {
                const responseData = response.data;
                //Store Data in LocalStorage
                localStorage.setItem('token', responseData.idToken);
                localStorage.setItem('userId', responseData.localId);
                context.commit('setUser', {
                    token: responseData.idToken,
                    userId: responseData.localId,
                    tokenExpiration: responseData.expiresIn

                });

            })
            .catch(error => context.commit('seetErrors', error));
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExpiration: null,
            });
        }
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null,
            errors: '',
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
}