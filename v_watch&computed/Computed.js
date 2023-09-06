class Computed {
  constructor() {
    this.computedData = [];
  }

  addComputed(vm, computed, key) {
    const descriptor = Object.getOwnPropertyDescriptor(computed, key),
      descriptorFn = descriptor.value.get
        ? /**
           * total(){
           * 	 get(){
           *	 	return this.x + this.y
           * 	}
           * }
           */
          descriptor.value.get
        : descriptor.value,
      value = descriptorFn.call(vm), // this point to the window. so, we need to point this here to vm
      get = descriptorFn.bind(vm),
      dep = this._collectDep(descriptorFn);

    this._addComputedPush({
      key,
      value,
      get,
      dep,
    });

    // c: _addComputedPush().activity key -> {}.key -> total ; key: computed: {}.total -> key
    const dataC = this.computedData.find((c) => c.key === key);
    this._computedReactive(vm, dataC, key);
  }
  /**
   * 当计算熟属性函数依赖发生变化时 更新计算结果
   * @param {string} key computed.propFn
   * @param {function} cb
   */
  _update(key, watch) {
    this.computedData.map((computed) => {
      const dep = computed.dep,
        _key = dep.find((el) => el == key); // 在缓存中确认要更新 key 是否存在
      if (_key) {
        const prevVal = computed.value;
        computed.value = computed.get();
        watch(computed.key, computed.value, prevVal);
      }
    });
  }

  /**将使用计算属性的函数结果 挂载到 vm 实例上*/
  _computedReactive(vm, c, key) {
    Object.defineProperty(vm, key, {
      get() {
        return c.value;
      },
      set(newVal) {
        c.value = get(); // 这里需要注意的是：无论是否有传入值 这个值都应该是被 computed 计算后的
      },
    });
  }

  /**
   * 依赖收集
   * @param {any} desFn 属性 descriptor
   * @returns 当前属性的依赖的集合
   */
  _collectDep(desFn) {
    const matched = desFn.toString().match(/this.(.+?)/g),
      dep = matched.map((m) => {
        return m.split(".")[1];
      });

    return dep;
  }

  _addComputedPush(computedProp) {
    this.computedData.push(computedProp);
  }
}

/**
 * return:
 * 		{
 * 			key: computed[key] - key ->  fn_name: total
 * 			value: computed[key](){ return this.x + this.y } -> x + y
 * 			get: computed[key] fn -> total(){}
 * 			dep: [ x, y ]
 * 		}
 */
export default Computed;
