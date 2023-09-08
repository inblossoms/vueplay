import { reactive, ref } from "vue";
import { createStore } from "../vuexc";

export default createStore({
  state: {
    count: ref(0),
    info: ref("info."),
  },
  mutations: {
    // mutations 只能引用 state 中的值
    increase(state, count) {
      state.count++;
    },
    setListMesg(state, data) {
      state.info = data;
    },
  },
  actions: {
    increase({ commit, state }, count) {
      setTimeout(() => {
        commit("increase");
      }, 1000);
    },
    // actions 处理异步
    getListMesg(ctx, data) {
      ctx.commit("setListMesg", data);
    },
  },
  getters: {
    // getters 对 state 中的数据进行拦截并给与开发者对于 state 中的数据的操作权限
    showInfo(state) {
      return state.info;
    },
  },
});
