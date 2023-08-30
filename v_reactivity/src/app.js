import { useReactive, useDOM } from "../reactivity/index";

function App() {
  const state = useReactive({
    count: 0,
  });

  const add = (num) => {
    state.count += num;
  };

  const minus = (num) => {
    state.count -= num;
  };

  return {
    template: `
		<div>
			<h2>{{ count }}</h2>
			<button onClick="add(1)"> + </button>
			<button onClick="minus(2)"> - </button>
		</div>
	`,
    state,
    methods: {
      add,
      minus,
    },
  };
}

useDOM(App(), document.querySelector("#app"));
