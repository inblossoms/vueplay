<script setup>
import { useStore } from "../vuexc";

const store = useStore();
const increase_m = () => {
  store.commit("increase");
};
const increase_a = () => {
  store.dispatch("increase");
};
</script>

<template>
  <div>
    <h1>
      {{ store.state.count }}
    </h1>
    <button @click="increase_m">vuex-c: mutation</button>
    <button @click="increase_a">vuex-c: action</button>
  </div>
</template>
