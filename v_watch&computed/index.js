import { Reactive } from "./Reactive.js";
import Computed from "./Computed.js";
import Watcher from "./Watcher.js";

class Vue {
  constructor(options) {
    const { data, computed, watch } = options;

    this.$data = data();

    this._init(this, computed, watch);
  }

  _init(vm, computed, watch) {
    this._initData(vm);

    const computedIns = this._initComputed(vm, computed);
    const watcherIns = this._initWatcher(vm, watch);

    this.$computed = computedIns._update.bind(computedIns);
    this.$watch = watcherIns._invoke.bind(watcherIns);
  }
  _initData(vm) {
    Reactive(
      vm,
      (key, value) => {
        // console.log("get:", key, value);
      },
      (key, newVal, oldVal) => {
        if (newVal === oldVal) return;

        this.$computed(key, this.$watch);
        this.$watch(key, newVal, oldVal);
      }
    );
  }
  _initComputed(vm, computed) {
    // 枚举computed 增加computedData
    // 返回实例 -> 实例调用update 更新 computedData
    const computedIns = new Computed();
    for (const key in computed) {
      computedIns.addComputed(vm, computed, key);
    }

    return computedIns;
  }
  _initWatcher(vm, watch) {
    // 枚举 watcher，添加侦听器
    // 返回实例 -> 通过实例调用watch方法 触发回调的执行
    const watcherIns = new Watcher();

    for (const key in watch) {
      watcherIns._addWatcher(vm, watch, key);
    }

    return watcherIns;
  }
}

let vm = new Vue({
  data() {
    return {
      x: 1,
      y: 2,
    };
  },

  computed: {
    total() {
      console.log("COMPUTED HOOK was Called.");
      return this.x + this.y;
    },
  },

  watch: {
    total(newVal, oldVal) {
      console.log("WATCH HOOK was Called.:", "prev:", newVal, "curt:", oldVal);
      return "total is change!";
    },
    x() {
      return this.x;
    },
  },
});

console.log(vm);
vm.x;
console.log("Get:", vm.total);
vm.x = 2;
console.log("Update :", vm.total);
console.log("Update :", vm.total);
vm.y = 5;
console.log("Update :", vm.total);
console.log("Update :", vm.total);

/**
 * data 在执行后是需要被实例可以访问到的 - 并且做响应式处理
 * 			get -> vm[key] : vm.$data[key]
 * 			set -> vm[key] : vm.$data[key] = newVal
 * 					- updateComputedProp
 * 					- updateWatchProp
 *
 * computed -> props -> {
 * 			props 发生变化 重新执行回调
 * 				value : get(){ return newVal }
 * 				get : method
 * 				dep : [x, y]
 * }
 *
 * watch -> props -> {
 * 			props 发生变化 执行回调 -> fn
 * 			data_props 发生变化 -> set() -> fn
 * }
 */
