class Watcher {
  constructor() {
    this.watchers = [];
  }

  _addWatcher(vm, watcher, key) {
    this._addWatcherProp({
      key,
      fn: watcher[key].bind(vm),
    });
  }
  // 调用
  _invoke(key, newVal, oldVal) {
    this.watchers.map((watcher) => {
      if (watcher.key === key) {
        watcher.fn(newVal, oldVal);
      }
    });
  }

  _addWatcherProp(watchProp) {
    this.watchers.push(watchProp);
  }
}

/**
 * addWatcher (vm, watcher, key)
 *
 * this.watchers -> watch -> {
 * 	 key: total
 * 	 fn: total -  () => {}
 * }
 */

export default Watcher;
