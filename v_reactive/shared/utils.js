export function isObject(value) {
  return typeof value === "object" && value !== null;
}

export function isHasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual(nv, ov) {
  return nv === ov;
}
