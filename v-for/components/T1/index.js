import { createReactive } from "../../core";

const template = `
	<ul class="list">
		<h1>{{ title }}</h1>
		{{dateTime}}
		<for data="list" tag="li" class="info">
			<span>name: {name}</span>
			<span>sex: {sex}</span>
			<for>
				<span>hobbies: {hobbies}</span>
			</for>
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
        hobbies: ["dance", "travel"],
      },
      {
        id: 2,
        name: "lili",
        sex: "male",
        hobbies: ["sing", "movie"],
      },
      {
        id: 3,
        name: "pipi",
        sex: "male",
        hobbies: ["swimming"],
      },
    ],
  });
  console.log(state);
  return [template, state];
}
