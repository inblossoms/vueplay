import { complileTemplate } from "./compler";

const nodePool = [];

export function createApp(options) {
  for (let option in options) {
    switch (option) {
      case "components":
        initComponent(options[option]);
        break;

      default:
        break;
    }
  }

  return {
    mount,
  };
}

function mount(el) {
  const app = document.querySelector(el);
  const oFrag = document.createDocumentFragment();
  nodePool.forEach((node) => {
    oFrag.appendChild(node);
  });
  app.appendChild(oFrag);
}

function initComponent(components) {
  for (let component of components) {
    let [template, state] = component();
    const node = complileTemplate(template, state);
    nodePool.push(node);
  }
}
