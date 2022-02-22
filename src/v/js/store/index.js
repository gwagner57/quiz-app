import actions from './actions.js';
import mutations from './mutations.js';
import Store from './store.js';
import { loadState, saveState } from "../lib/persistState.js";


const defaultState = {
    user: null,
    quiz: null
};

const state = loadState() || defaultState;

const store = new Store({
    actions,
    mutations,
    state
});

store.events.subscribe('stateChange', () => {
    saveState(store.state);
});

export default store;