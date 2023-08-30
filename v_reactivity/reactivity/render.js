import { stateFormat } from "./compiler/state";
import { eventFormat, vBindEvent } from "./compiler/event";

export function useDOM({ template, state, methods }, rootDOM) {
  rootDOM.innerHTML = renderer(template, state);
  vBindEvent(methods);
}

export function renderer(template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);
  return template;
}

export function updateStateValue(statePool, key, value) {
  let oItem = null;
  const rootNode = document.getElementById("app"),
    allElements = rootNode.getElementsByTagName("*");

  statePool.forEach((item) => {
    // item.state[len -1]: [.x.y.count] -> count ===  key: count
    // vm: item === model: state
    if (item.state[item.state.length - 1] === key) {
      for (let idx = 0, len = allElements.length; idx < len; idx++) {
        oItem = allElements[idx];
        const _flag = oItem.dataset.flag;

        // vm === view: _flag
        if (item.flag === _flag) {
          oItem.innerHTML = value;
        }
      }
    }
  });
}
