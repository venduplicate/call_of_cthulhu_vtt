<script setup lang="ts">
// export let textData: string = "";
// export let title: string;
</script>

<template>
  <div class="container">
    <h3>{title}</h3>
    <textarea value="{textData}" />
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
}
textarea {
  height: max-content;
  width: max-content;
}
</style>
