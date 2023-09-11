export function createActions(store, actions) {
  for (const method in actions) {
    if (Object.hasOwnProperty.call(actions, method)) {
      const attr = actions[method];
      store[method] = attr;
    }
  }
}
