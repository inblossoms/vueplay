export function $patch(partialState) {
  const store = this;
  for (const key in partialState) {
    if (Object.hasOwnProperty.call(store, key)) {
      const result = partialState[key];
      store[key] = result;
    }
  }
}
