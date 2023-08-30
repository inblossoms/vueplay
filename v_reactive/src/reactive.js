import { isObject } from "../shared/utils";
import { mutableHanler } from "./mutableHanler";

export function reactive(target) {
  return createReactiveObject(target, mutableHanler);
}

function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) return target;

  const observer = new Proxy(target, baseHandler);
  return observer;
}
