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

export function T2() {
  const state = createReactive({
    title: "备用数据",
    dateTime: "2023-4-5",
    info: [
      {
        id: 1,
        name: "zs",
        sex: "male",
        hobbies: ["dance", "travel"],
      },
      {
        id: 2,
        name: "ls",
        sex: "female",
        hobbies: ["sing", "movie"],
      },
    ],
  });

  return [template, state];
}
