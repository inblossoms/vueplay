import { isObject } from "../utils";
import { createReactive } from "./reactive";

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);

    if (isObject(res)) {
      return createReactive(res);
    }

    return res;
  };
}
function createSetter() {
  return function (target, key, value, receiver) {
    return Reflect(target, key, value, receiver);
  };
}

export const proxyHanlder = {
  get,
  set,
};
