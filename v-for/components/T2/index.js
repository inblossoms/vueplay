import { createReactive } from "../../core/index.js";

const template = `
	<ul class="info">
		<h1>{{ title }}</h1>
		{{dateTime}}
		<for data="info" tag="li" class="itme">
			<span>name: {name}</span>
			<span>sex: {sex}</span>
		</for>
	</ul>
`;

export function T2() {
  const state = createReactive({
    title: "备用数据",
    dateTime: "2023-4-5",
    info: [
      {
        id: 1,
        name: "zs",
        sex: "male",
      },
      {
        id: 2,
        name: "ls",
        sex: "female",
      },
    ],
  });

  return [template, state];
}
