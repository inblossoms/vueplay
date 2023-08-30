import { REG_CBARGS, REG_CLICKEVENT, REG_FNNAME } from "../shared/constant";
import { randomNumber, bindEvent, checkType } from "../shared/utils";

/**
 *	eventPool = []
 * 	{
 * 		flag: 用于唯一标识的字符串
 * 		handler: 事件处理函数的字符串
 * 		type: claick
 * 	}
 */

const eventPool = [];

export function eventFormat(template) {
  return template.replace(REG_CLICKEVENT, function (node, key) {
    const _flag = randomNumber();

    eventPool.push({
      flag: _flag,
      handler: key.trim(),
      type: "click",
    });

    return `data-flag="${_flag}"`;
  });
}

export function vBindEvent(methods) {
  const rootNode = document.getElementById("app"),
    allElements = rootNode.getElementsByTagName("*");

  eventPool.forEach((event) => callNodeMethod(event, allElements, methods));
}

function callNodeMethod(event, allElements, methods) {
  let oItem = null,
    oFlag = null;

  for (let idx = 0, len = allElements.length; idx < len; idx++) {
    (oItem = allElements[idx]), (oFlag = oItem.dataset.flag);

    // eventPoll.flag === element.setdata.flag
    if (event.flag === oFlag) {
      bindEvent(oItem, event.type, function () {
        //   'add(2)'	=>	methods[0]()
        const fname = event.handler.match(REG_FNNAME)[1],
          args = checkType(event.handler.match(REG_CBARGS)[1]);

        methods[fname](args);
      });
    }
  }
}
