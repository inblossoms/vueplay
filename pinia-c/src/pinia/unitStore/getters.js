import { computed } from "vue";

export function createGetters(store, getters) {
  for (const getter in getters) {
    if (Object.hasOwnProperty.call(getters, getter)) {
      store[getter] = computed(store[getter].bind(store.$state, store.$state));
      store.$state[getter] = store[getter];
    }
  }
}
