<script setup name="hello-world">
import { ref, computed, effect, effectScope } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
let doubleCount = null;

const scope = effectScope();

scope.run(() => {
  // effect scope 实例可嵌套被调用
  effect(() => {});
  doubleCount = computed(() => count.value * 2);
});

const AddCount = () => count.value++;
const StopCountActive = () => scope.stop(); // 停止 effect scope
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>PINIA</h2>
  <h3>COUNT: {{ count }} :: Double-Count: {{ doubleCount }}</h3>
  <button @click="AddCount">AddCount</button>
  <button @click="StopCountActive">StopCountActive</button>
</template>

<style scoped></style>
