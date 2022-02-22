import store from "./store.js";

export default {
    getUser() {
       return store.state.user;
    },
};