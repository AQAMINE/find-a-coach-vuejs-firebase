export default {
    async ContactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        }

        await window.axios.post(`https://find-a-coach-vuejs-firebase-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, newRequest)
            .then(response => {

                const responseData = response.data.name;
                console.log(responseData);
                newRequest.id = responseData;


                //store coach id just on the local data
                newRequest.coachId = payload.coachId;
                context.commit('addRequest', newRequest);
            })
            .catch(error => console.log(error.response.data.errors));



    },
    async fetchRequests(context) {
        //get Curent User Id 
        const coachId = context.rootGetters.userId;

        const requests = [];
        await window.axios.get(`https://find-a-coach-vuejs-firebase-default-rtdb.firebaseio.com/requests/${coachId}.json`)
            .then(response => {

                const responseData = response.data;
                for (const key in responseData) {
                    const request = {
                        id: key,
                        coachId: coachId,
                        userEmail: responseData[key].userEmail,
                        message: responseData[key].message,
                    };
                    requests.push(request);
                }
                context.commit('setRequest', requests);
            }).catch(error => /*context.commit('setErrors', error)*/ console.log(error));
    }

};