import { isEqual, isHasOwnProperty, isObject } from "../shared/utils";
import { reactive } from "./reactive";
// import { reactive } from "@vue/reactivity";

const get = createGet(),
  set = createSet();

function createGet() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    console.log("Proxy Getter:", key, target[key]);

    if (isObject(res)) return reactive(res);

    return res;
  };
}
function createSet() {
  return function set(target, key, value, receiver) {
    const isKeyExist = isHasOwnProperty(target, key),
      isValEqual = isEqual(target[key], value),
      res = Reflect.set(target, key, value, receiver);
    console.log("setter --");

    if (!isKeyExist) {
      console.log("Proxy Setter: key:", key, "value:", value);
    } else if (isValEqual) {
      console.log("Proxy Update: key:", key, "value:", value);
    }

    return res;
  };
}

export const mutableHanler = {
  get,
  set,
};
