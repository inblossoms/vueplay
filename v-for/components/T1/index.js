import { createReactive } from "../../core/index.js";

const template = `
	<ul class="info">
		<h1>{{ title }}</h1>
		{{dateTime}}
		<for data="info" tag="li" class="item">
			<span>name: {name}</span>
			<span>sex: {sex}</span>
		</for>
	</ul>
`;

export function T1() {
  const state = createReactive({
    title: "个人数据",
    dateTime: "2023-4-5",
    info: [
      {
        id: 1,
        name: "kaka",
        sex: "male",
      },
      {
        id: 2,
        name: "lili",
        sex: "male",
      },
      {
        id: 3,
        name: "pipi",
        sex: "male",
      },
    ],
  });
  return [template, state];
}
