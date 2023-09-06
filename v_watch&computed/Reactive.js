export function Reactive(vm, __get__, __set__) {
  const _data = vm.$data;

  for (const key in _data) {
    vm.__defineGetter__(key, function () {
      __get__(key, _data[key]);
      return _data[key];
    });
    vm.__defineSetter__(key, function (newVal) {
      const oldVal = _data[key];
      _data[key] = newVal;
      __set__(key, newVal, oldVal);
    });
  }
}
