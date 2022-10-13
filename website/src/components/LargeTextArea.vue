<script setup lang="ts"></script>
// export let textData: string = ""; // export let title: string;
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
  height: max-content;
  width: 100%;
  padding: 2em;
}
textarea {
  height: 50vh;
  width: 30vw;
}
</style>
