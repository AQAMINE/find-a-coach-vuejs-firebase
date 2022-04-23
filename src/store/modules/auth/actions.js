export default {
    login() {},
    async signup(context, payload) {


        await window.axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEmphwbbXJI0LugV2mU_NONu2fou4xIrg`, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
            .then(response => {
                const responseData = response.data;
                console.log(responseData);
                context.commit('setUser', {
                    token: responseData.idToken,
                    userId: responseData.localId,
                    tokenExpiration: responseData.expiresIn
                })
            })
            .catch(error => console.log(error));

    }
}