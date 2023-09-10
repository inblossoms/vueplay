import { inject, reactive } from "vue";

export function createPinia() {
  return {
    install(app) {
      const _store = reactive({});
      app.provide("subStore", function (storeName, store) {
        _store[storeName] = store;
        _store[storeName].$patch = function (opt) {
          for (const key in opt) {
            if (Object.hasOwnProperty.call(_store[storeName], key)) {
              const result = opt[key];
              _store[storeName][key] = result;
            }
          }
        };
      });

      app.provide("Store", _store);
    },
  };
}

export function defineStore(storeName, storeOptions) {
  const _store = reactive({});

  const state = storeOptions.state(),
    actions = storeOptions.actions;

  for (const key in state) {
    if (Object.hasOwnProperty.call(state, key)) {
      const attr = state[key];
      _store[key] = attr;
    }
  }

  for (const method in actions) {
    if (Object.hasOwnProperty.call(actions, method)) {
      const attr = actions[method];
      _store[method] = attr;
    }
  }

  return function () {
    const piniaStore = inject("Store");
    if (!piniaStore[storeName]) {
      const subStore = inject("subStore");
      subStore(storeName, _store);
    }
    return piniaStore[storeName];
  };
}
