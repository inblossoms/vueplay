<script setup>
import { default as useCounterStore } from "@/store/counter";
// import { storeToRefs } from "@/pinia";

const counter = useCounterStore();
// const { count } = storeToRefs(counter);
</script>

<template>
  <h1>{{ counter.count }}</h1>
  <button @click="counter.increment()">increment</button>
</template>
