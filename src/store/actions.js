export default {
    startQuiz(context, payload) {
        context.commit('createUser', { name: payload.name });
        // context.commit('createUser', payload.playerName);
    },
};