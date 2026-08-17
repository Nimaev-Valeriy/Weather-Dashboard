<script setup lang="ts">
import { onMounted } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import getWeather from "./api.ts";

onMounted(() => {
  getWeather();
});
</script>

<template>
  <HelloWorld />
</template>
