import { effectScope, ref } from "vue";

export default function createPinia() {
  const store = new Map(),
    scope = effectScope(true),
    state = scope.run(() => ref(new Map()));

  function install(app) {
    app.config.globalProperties.$pinia = this; // 使 pinia 可以在 defineStore 被调用时可以访问
  }

  return {
    store,
    scope,
    state,
    install,
  };
}
