import Person from "../classes/person.js";

export default {
    createUser(state, payload) {
        state.user = new Person(1, payload.name);
        console.log(state)
        return state;
    },
    // clearItem(state, payload) {
    //     state.items.splice(payload.index, 1);
        
    //     return state;
    // }
};