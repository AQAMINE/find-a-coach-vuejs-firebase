export default {
    ContactCoach(context, payload) {
        const newRequest = {
            coachId: new Date().toISOString(),
            userEmail: payload.email,
            message: payload.message
        }
        context.commit('addRequest', newRequest);
    }
};