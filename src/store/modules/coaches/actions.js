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
        window.axios.put(`https://find-a-coach-vuejs-firebase-default-rtdb.firebaseio.com/coaches/${userId}.json`, CoachData)
            .then( /*({ data }) => (console.log(data))*/ )
            .catch(error => console.log(error.response.data.errors));

        context.commit('registerCoach', {
            //copy coach data new object
            ...CoachData,
            id: userId

        });

    }

}