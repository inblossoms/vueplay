<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <router-link to="/">to home</router-link>
  |
  <router-link to="/about">to about</router-link>
  <router-view></router-view>
</template>

<style scoped></style>
