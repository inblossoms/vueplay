import { isEqual, isHasOwnProperty, isObject } from "../shared/utils";
import { useReactive } from ".";
import { statePool } from "../compiler/state";
import { updateStateValue } from "../render";

const get = createGet(),
  set = createSet();

function createGet() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    console.log("Proxy Getter:", key, target[key]);

    if (isObject(res)) return useReactive(res);

    return res;
  };
}
function createSet() {
  return function set(target, key, value, receiver) {
    const isKeyExist = isHasOwnProperty(target, key),
      res = Reflect.set(target, key, value, receiver),
      isValEqual = isEqual(target[key], value);

    if (!isKeyExist) {
      console.log("Proxy Setter: key:", key, "value:", value);
    } else if (isValEqual) {
      console.log("Proxy Update: key:", key, "value:", value);
      updateStateValue(statePool, key, value);
    }

    return res;
  };
}

export const mutableHanler = {
  get,
  set,
};
