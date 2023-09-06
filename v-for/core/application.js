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
  console.log(app);
}

function initComponent(components) {
  console.log(components);
  for (let component of components) {
    let [template, state] = component();
  }
}
