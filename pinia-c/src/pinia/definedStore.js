import { reactive, inject } from "vue";
import { createActions, createGetters, createState } from "./unitStore";

export function defineStore(storeName, storeOptions) {
  const _store = reactive({});
  const { state, getters, actions } = storeOptions;

  state && typeof state === "function" && createState(_store, state);
  getters &&
    Reflect.ownKeys(getters).length !== 0 &&
    createGetters(_store, getters);
  actions &&
    Reflect.ownKeys(actions).length !== 0 &&
    createActions(_store, actions);

  return function () {
    const subStore = inject("subStore");
    const Store = subStore(storeName, _store);

    return Store[storeName];
  };
}
