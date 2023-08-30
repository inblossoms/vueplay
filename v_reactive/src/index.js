import { reactive } from "./reactive";

const person = reactive({
  name: "Anna",
  age: 22,
  hobbies: ["dance", "sing", "travel"],
  friends: [
    {
      name: "Bob",
      age: 21,
    },
    {
      name: "Dou",
      age: 23,
    },
  ],
});

console.log(person);

person.name;
person.hobbies;
person.hobbies.push("coding");
person.friends[0].name;
person.friends[0] = {
  name: "Bob",
  age: 21,
  hobby: "sing",
};

console.log(person);
