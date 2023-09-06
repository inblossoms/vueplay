import { isObject } from "../utils";
import { proxyHanlder } from "./hanlder";

export function createReactive(state) {
  return createReactiveData(state, proxyHanlder);
}

function createReactiveData(state, proxyHanlder) {
  if (!isObject(state)) return;

  return new Proxy(state, proxyHanlder);
}
