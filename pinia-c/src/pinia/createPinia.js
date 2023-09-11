import { reactive } from "vue";
import { $patch } from "./apis";

export function createPinia() {
  const _store = reactive({});

  function subStore(storeName, store) {
    if (!_store[storeName]) {
      _store[storeName] = store;
      _store[storeName].$patch = $patch;
    }

    return _store;
  }

  return {
    install(app) {
      app.provide("subStore", subStore);
    },
  };
}
