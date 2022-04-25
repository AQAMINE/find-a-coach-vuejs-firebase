let timer;
export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
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

                //Token expiration (+ to convert to number)
                const expiresIn = +responseData.expiresIn * 1000;
                const expirationDate = new Date().getTime() + expiresIn;

                //Store Data in LocalStorage
                localStorage.setItem('token', responseData.idToken);
                localStorage.setItem('userId', responseData.localId);
                localStorage.setItem('tokenExpiration', expirationDate);

                //After this duration "expiresIn" this function will execute 
                timer = setTimeout(function() {
                    context.dispatch('autoLogout');
                }, expiresIn)

                context.commit('setUser', {
                    token: responseData.idToken,
                    userId: responseData.localId,
                });

            })
            .catch(error => context.commit('seetErrors', error));
    },
    tryLogin(context) {

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();
        if (expiresIn < 0) {
            return;
        }
        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        //if we manualy click the logout
        clearTimeout(timer);
        context.commit('setUser', {
            token: null,
            userId: null,
            errors: '',
        });

    },
    autoLogout(context) {
        //redirect after loginOut
        context.dispatch('logout');
        context.commit('setAutoLogout');

    }
}