import { REG_CHECKSTR, REG_STR } from "./constant";

export function isObject(value) {
  return typeof value === "object" && value !== null;
}

export function isHasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual(nv, ov) {
  return nv === ov;
}

export function randomNumber() {
  return (
    new Date().getTime().toString(32) +
    parseInt(Math.random() * Math.random() * 1000)
  );
}

export function bindEvent(target, eventType, cb, capture = false) {
  target.addEventListener(eventType, cb, capture);
}

export function checkType(str) {
  if (REG_CHECKSTR.test(str)) {
    str.replace(REG_STR, "");
  }

  switch (str) {
    case "false":
      return false;
    case "true":
      return true;
    default:
      break;
  }

  return Number(str);
}
