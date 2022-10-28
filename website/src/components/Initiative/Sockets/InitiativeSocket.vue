<script setup lang="ts">
import { useSocketStore } from '@/stores/socket';
import { onMounted } from 'vue';

const socketStore = useSocketStore()
const socket = socketStore.socketStore;

onMounted(() => {

})
</script>

<template>
    <slot></slot>
</template>