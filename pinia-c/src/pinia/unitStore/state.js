import { reactive, toRef } from "vue";

export function createState(store, state) {
  const _state = state();
  store.$state = reactive(_state);

  for (const key in _state) {
    if (Object.hasOwnProperty.call(_state, key)) {
      store[key] = toRef(store.$state, key);
    }
  }
}
