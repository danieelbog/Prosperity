<template>
    <FeedbackToaster />
    <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import FeedbackToaster from './components/FeedbackToaster.vue';

onMounted(() => {
    document.getElementById('app-loading-screen')?.remove();
});
</script>
