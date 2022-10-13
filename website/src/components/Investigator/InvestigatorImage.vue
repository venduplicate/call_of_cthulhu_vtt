<script setup lang="ts">
const props = defineProps({
  imgRef: String,
  investigatorName: String,
});

function updateImage() {
  console.log("image update todo");
}
</script>

<template>
  <img
    class="profile-img"
    :src="imgRef"
    :title="investigatorName"
    alt="Profile"
    width="200px"
    @click="updateImage"
  />
  <h1>
    <input type="text" name="name" value="{actorName}" placeholder="Name" />
  </h1>
</template>

<style></style>
