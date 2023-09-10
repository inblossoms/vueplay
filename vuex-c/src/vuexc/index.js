import { inject, reactive } from "vue";

export function createStore({ state, mutations, actions, getters }) {
  return new Store(state, mutations, actions, getters);
}

class Store {
  constructor(state, mutations, actions, getters) {
    this.state = state;
    this.mutations = mutations;
    this.actions = actions;
    this.getters = getters;
  }

  install(app) {
    const store = {};

    store.state = reactive(this.state);

    store.commit = (mulEvtName, payload) => {
      this.mutations[mulEvtName](store.state, payload);
    };

    store.dispatch = (actEvtName, payload) => {
      this.actions[actEvtName](
        {
          commit: store.commit,
          store: store.state,
        },
        payload
      );
    };

    // store.getters.fn
    // 会丢失 this， 把 this 传过去
    store.that = this;
    store.getters = this.getters;

    app.provide("store", store);
  }
}

export function useStore() {
  const store = inject("store");
  return store;
}
