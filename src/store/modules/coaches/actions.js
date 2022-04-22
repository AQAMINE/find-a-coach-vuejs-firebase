export default {

    registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const CoachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };
        //We are using PUT method to update or create coach if id exist update the coach else create it 
        window.axios.put(`https://find-a-coach-vuejs-firebase-default-rtdb.firebaseio.com/coaches/${userId}.json`, CoachData)
            .then( /*({ data }) => (console.log(data))*/ )
            .catch(error => console.log(error.response.data.errors));

        context.commit('registerCoach', {
            //copy coach data new object
            ...CoachData,
            id: userId

        });

    },
    async loadCoaches(context) {
        const coaches = [];
        await window.axios.get(`https://find-a-coach-vuejs-firebase-default-rtdb.firebaseio.com/coaches.json`)
            .then(response => {

                const responseData = response.data;

                for (const key in responseData) {
                    const coach = {
                        id: key,
                        firstName: responseData[key].firstName,
                        lastName: responseData[key].lastName,
                        description: responseData[key].description,
                        hourlyRate: responseData[key].hourlyRate,
                        areas: responseData[key].areas
                    };
                    coaches.push(coach);
                }
                context.commit('setCoaches', coaches);
            }).catch(error => context.commit('setErrors', error));




    }

}