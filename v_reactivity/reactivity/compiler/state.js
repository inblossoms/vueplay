import { REG_ELEMTAG, REG_ELEMTAGS, REG_SATEVALUE } from "../shared/constant";
import { randomNumber } from "../shared/utils";

export const statePool = [];

export function stateFormat(template, state) {
  let steps = 0,
    _state = {};

  template = template.replace(REG_ELEMTAGS, (node, key) => {
    const _flag = randomNumber(),
      matched = template.match(REG_ELEMTAG);

    _state.flag = _flag;
    statePool.push(_state);
    _state = {};

    return `<${matched[1]} data-flag="${_flag}">{{${matched[2]}}}<${matched[3]}>`;
  });

  template = template.replace(REG_SATEVALUE, function (node, key) {
    let _val = key.trim(),
      idx = 0;
    const _valArr = _val.split(".");

    while (idx < _valArr.length) {
      _val = state[_valArr[idx]];
      idx++;
    }
    statePool[steps++].state = _valArr;

    return _val;
  });

  return template;
}
