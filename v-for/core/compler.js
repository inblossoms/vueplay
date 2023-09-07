const customTags = ["if", "for"];
const REG_Singel = /\{(.*?)\}/g;
const REG_Dubble = /\{\{(.*?)\}\}/g;

export function complileTemplate(template, data) {
  template = replaceVar(template, data, REG_Dubble);
  const _node = document.createElement("div");
  _node.innerHTML = template;

  return complieNode(_node, data);
}

function complieNode(node, data) {
  const _childNodes = node.querySelectorAll("*");
  _childNodes.forEach((childNode) => {
    // console.log(childNode);

    const tag_name = childNode.tagName.toLowerCase();
    if (customTags.includes(tag_name)) {
      replaceTplVal(childNode, tag_name, data);
    }
  });
  return [..._childNodes].find((node) => node.nodeType === 1);
}

function replaceTplVal(node, tag, data) {
  const tagVar = node.getAttribute("data"),
    className = node.calssName, // 不一定有
    realTag = node.getAttribute("tag");

  switch (tag) {
    case "for":
      vFor(node, data, tagVar, className, realTag);
      break;
    default:
      break;
  }
}

function vFor(node, data, tagVar, className, realTag) {
  const oFrag = document.createDocumentFragment();
  console.log(data, tagVar);

  data[tagVar].forEach((n) => {
    const el = document.createElement(realTag);
    el.calssName = className ?? "";
    el.innerHTML = replaceVar(node.innerHTML, n, REG_Singel);
    oFrag.appendChild(el);
  });
  node.parentNode.replaceChild(oFrag, node);
}

function replaceVar(html, data, reg) {
  return html.replace(reg, (node, key) => {
    const o = {};
    const k = key.trim();

    return (o[k] = data[k]);
  });
}
