<script setup lang="ts">
import { useRoute } from "vue-router";
import { useSocketStore } from "../stores/socket";
const route = useRoute();
const sessionId = route.params.sessionId as string;

const socketStore = useSocketStore();

socketStore.initSession(sessionId);
</script>

<template>
  <main>
    <div></div>
  </main>
</template>
